# Taste API - Order Management & WhatsApp Notification System

**Taste API** is a backend application designed to manage customer orders for a food delivery or restaurant service. The project was developed with a focus on real-world functionality, combining clean code structure, database integration, and third-party messaging automation.

The API allows clients (both registered and guests) to:
- Browse and place orders with multiple products.
- Choose delivery methods and leave custom notes.
- Automatically send order confirmation via **WhatsApp** using the **Twilio API**.

### Key Features:
- **JWT-based Authentication** for registered users and admin roles.
- **Order & Item Management:** Each order can include multiple products, quantities, and custom delivery instructions.
- **Role-based Access:** Admins can view, filter, and update the status of all orders.
- **WhatsApp Integration:** Every order sends a real-time message to the business WhatsApp number with order details.
- **Guest Checkout:** Non-registered users can place orders using just their name.
- **Clean, scalable structure** using **FastAPI**, with database models built using SQLAlchemy.

This project aims to simulate how a backend service for a modern food ordering platform would operate, including automation, client communication, and secure access layers.

> ⚙️ Built with: FastAPI, Python, PostgreSQL, SQLAlchemy, Pydantic, and Twilio API.

Images below demonstrate API endpoints, example payloads, and WhatsApp integration.

<img width="1899" height="936" alt="1" src="https://github.com/user-attachments/assets/4f2bbe3a-508c-40c5-9c20-d9d396ca5c23" />

<img width="1902" height="943" alt="2" src="https://github.com/user-attachments/assets/13666401-68ff-49cb-99e7-81df25afb3be" />
<img width="1897" height="938" alt="3" src="https://github.com/user-attachments/assets/4f4253a0-4157-4b7e-a730-a171014a6962" />
<img width="1900" height="944" alt="4" src="https://github.com/user-attachments/assets/65dd6dff-1e7f-46bb-ae34-c7ad8fa6d586" />
<img width="1901" height="936" alt="5" src="https://github.com/user-attachments/assets/3856163b-568e-4a60-bbc7-e9361b4f29bc" />
<img width="1899" height="940" alt="6" src="https://github.com/user-attachments/assets/41602ed8-9a9e-40dc-bbd3-ddc9bcb05a4d" />
<img width="1619" height="648" alt="8" src="https://github.com/user-attachments/assets/a68b3a73-cc15-48cf-8a2e-68d23da1bc57" />
<img width="775" height="315" alt="7" src="https://github.com/user-attachments/assets/2d272776-802d-4666-a854-cadb0bfd1987" />
