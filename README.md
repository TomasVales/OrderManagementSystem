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

> ⚙️ Built with: FastAPI, Python, SQLite (or PostgreSQL), SQLAlchemy, Pydantic, and Twilio API.

Images below demonstrate API endpoints, example payloads, and WhatsApp integration.

<img width="1897" height="938" alt="3" src="https://github.com/user-attachments/assets/b0aa9274-e4c9-45f9-b414-993cab93b68d" /><img width="1619" height="648" alt="8" src="https://github.com/user-attachments/assets/868887c4-598f-4d15-95a5-a4d341a3503e" />
<img width="775" height="315" alt="7" src="https://github.com/user-attachments/assets/548442fe-5a71-4ca6-8731-613c040ff2d4" />
<img width="1899" height="940" alt="6" src="https://github.com/user-attachments/assets/42dcc7d9-d3ec-461a-bee3-2f07ef8bd6c3" />
<img width="1901" height="936" alt="5" src="https://github.com/user-attachments/assets/e6fddb7b-ef57-4d75-9a6d-53c5ef21b4d8" />
<img width="1900" height="944" alt="4" src="https://github.com/user-attachments/assets/dbdb40dd-02ec-403a-ab91-e6547e4a2325" />

<img width="1902" height="943" alt="2" src="https://github.com/user-attachments/assets/0f88c207-27e4-4b7f-8e38-95534c4ebb34" />
<img width="1899" height="936" alt="1" src="https://github.com/user-attachments/assets/c1f2fb85-9f73-4a04-86c9-d9b6a4c0f8d6" />

