# Covisource API docs

### **GET `/`**

Returns a welcome greeting

### **GET `/secretRoute`**

This is a test route. If authenticated returns authenticated

### **POST `/user/newUser`**

A route to make new users.

#### **Body:**

##### **id** - The Users Id that the provider gave

##### **name** - The Users Name

##### **email** - The Users Email

##### **provider** - The Provider the user signed up with

<br>