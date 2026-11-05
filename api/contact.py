import json
import os
import re
import smtplib
import ssl
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler


MAX_BODY_BYTES = 16_384
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _send_json(handler, status, payload):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("X-Content-Type-Options", "nosniff")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return _send_json(self, 400, {"error": "Invalid request."})

        if content_length <= 0 or content_length > MAX_BODY_BYTES:
            return _send_json(self, 413, {"error": "Please send a shorter message."})

        if "application/json" not in self.headers.get("Content-Type", "").lower():
            return _send_json(self, 415, {"error": "Send the form as JSON."})

        try:
            data = json.loads(self.rfile.read(content_length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return _send_json(self, 400, {"error": "Invalid form data."})

        if not isinstance(data, dict):
            return _send_json(self, 400, {"error": "Invalid form data."})

        # Quietly accept bot submissions without forwarding them.
        if str(data.get("website", "")).strip():
            return _send_json(self, 200, {"ok": True})

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip()
        message = str(data.get("message", "")).strip()

        if not name or len(name) > 100 or any(ord(char) < 32 for char in name):
            return _send_json(self, 400, {"error": "Enter a valid name (up to 100 characters)."})
        if len(email) > 254 or not EMAIL_PATTERN.fullmatch(email):
            return _send_json(self, 400, {"error": "Enter a valid email address."})
        if not message or len(message) > 5000:
            return _send_json(self, 400, {"error": "Enter a message up to 5,000 characters."})

        settings = {
            "host": os.environ.get("SMTP_HOST"),
            "port": os.environ.get("SMTP_PORT", "587"),
            "username": os.environ.get("SMTP_USERNAME"),
            "password": os.environ.get("SMTP_PASSWORD"),
            "recipient": os.environ.get("CONTACT_EMAIL"),
        }
        if not all(settings.values()):
            return _send_json(self, 503, {"error": "The contact form is not configured yet. Please email me directly."})

        try:
            port = int(settings["port"])
        except ValueError:
            return _send_json(self, 503, {"error": "The contact form is temporarily unavailable. Please email me directly."})

        sender = os.environ.get("SMTP_FROM_EMAIL", settings["username"])
        email_message = EmailMessage()
        email_message["Subject"] = f"Portfolio message from {name}"
        email_message["From"] = sender
        email_message["To"] = settings["recipient"]
        email_message["Reply-To"] = email
        email_message.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

        try:
            if os.environ.get("SMTP_USE_SSL", "false").lower() in {"1", "true", "yes"}:
                with smtplib.SMTP_SSL(settings["host"], port, context=ssl.create_default_context(), timeout=10) as smtp:
                    smtp.login(settings["username"], settings["password"])
                    smtp.send_message(email_message)
            else:
                with smtplib.SMTP(settings["host"], port, timeout=10) as smtp:
                    smtp.ehlo()
                    smtp.starttls(context=ssl.create_default_context())
                    smtp.ehlo()
                    smtp.login(settings["username"], settings["password"])
                    smtp.send_message(email_message)
        except (OSError, smtplib.SMTPException):
            return _send_json(self, 502, {"error": "Your message could not be delivered right now. Please try again or email me directly."})

        return _send_json(self, 200, {"ok": True})

    def do_GET(self):
        return _send_json(self, 405, {"error": "Use POST to send a message."})

    def log_message(self, format, *args):
        # Keep submitted contact details out of function logs.
        return
