
# Coupon Management Application

This project is a web application built using **Vite + React** for the front end and **JSON Server** for the backend. The application is designed for **CRUD operations on coupons**, user management, and coupon application. It includes both an **admin interface** for managing users and coupons and a **user interface** for applying discounts.

## Features

### User Management (Admin)
- **Admin Access Only**:
  - Only admins can create new users.
- **User Registration**:
  - Admins can create new users with a username and password.
- **User Login**:
  - Registered users can log in using their credentials.
- **User Logout**:
  - Logged-in users can log out from their accounts.

### Coupon Management (Coupons)
- **Admin Privileges**:
  - Admins can view, add, edit, and delete coupons.
- **Coupon Application**:
  - Users can enter a coupon code to receive a discount and view the total order amount after applying the coupon.
  - Users can enter multiple coupon codes, where applicable.
- **Coupon Details**:
  - Coupons include a code that is kept secret and is the only way to apply the coupon.
  - Each coupon has a description visible only to admins.
  - Coupons store the ID of the user who created them, as well as the creation date and time.
- **Discount Options**:
  - Coupons can provide a discount in either a percentage or a fixed amount.
  - Some coupons may have expiration dates.
  - Some coupons allow "stacking" with other coupons, while others do not.
  - Some coupons have a usage limit, restricting the number of times they can be used.

### Reporting (Reports)
- **Coupon Usage Tracking**:
  - The reporting system allows tracking coupon usage for analysis and insight into coupon use.
- **Admin Reports**:
  - View a list of coupons created by a specific user.
  - View a list of coupons created within a specified date range.
  - Export coupon lists to Excel for further analysis.

## Getting Started

### Prerequisites
- Node.js and npm installed
- JSON Server installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DanilVo/oversight-cupon-app-hw.git
   cd coupon-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start JSON Server:
   ```bash
   npm run json-server
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

### Configuration
- The application assumes JSON-Server is running on `localhost:3000`. Adjust configurations if necessary in the `src/config.js` file.

### Usage
- Admin users can log in and access the admin dashboard to manage users and coupons.
- Regular users can log in to apply coupon codes to their orders.

## Technologies Used
- **Frontend**: Vite + React
- **Backend**: JSON-Server
- **Data Export**: Excel-compatible format

## Contributing
1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

This README should provide a clear guide for developers and users alike, covering key aspects of functionality, setup, and usage.