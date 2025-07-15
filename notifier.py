import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
FROM_WA = os.getenv("TWILIO_WHATSAPP_FROM")
TO_WA = os.getenv("TWILIO_WHATSAPP_TO")

client = Client(ACCOUNT_SID, AUTH_TOKEN)


def send_whatsapp_message(customer_name, items, total):
    try:
        product_lines = "\n".join(
            [f"- {qty}x {prod.name} (${prod.price * qty:.2f})" for prod,
             qty in items]
        )
        msg = f"🛒 *Nuevo pedido de {customer_name}*\n{product_lines}\n\n💰 Total: ${total:.2f}"

        message = client.messages.create(
            body=msg,
            from_=FROM_WA,
            to=TO_WA
        )
        print(f"[WhatsApp] Mensaje enviado: SID {message.sid}")
    except Exception as e:
        print(f"[WhatsApp] Error al enviar mensaje: {e}")
