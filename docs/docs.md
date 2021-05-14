# Covisource API docs

### **GET `/`**

Returns a welcome greeting

### **POST `/user/newUser`**

A route to make new users.

#### **Body:**

##### **id** - The Users Id that the provider gave

##### **name** - The Users Name

##### **email** - The Users Email

##### **provider** - The Provider the user signed up with

<br>

### **POST `/category/newCategory`**

A route to make new categories. The user must be of admin level to utilize this route

#### **Body:**

##### **name** - The Category Name

#### **Headers:**

##### **Authorization** - The users JWT (e.g: token JWT_TOKEN)

<br>