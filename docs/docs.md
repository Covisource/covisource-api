# Covisource API docs

`* Indicates a required parameter`

### **GET `/`**

Returns a welcome greeting

### **POST `/user/newUser`**

A route to make new users.

#### **Body:**

##### **\*user**

- ##### **\*id** - The Users Id that the provider gave

- ##### **\*name** - The Users Name

- ##### **\*email** - The Users Email

- ##### **\*provider** - The Provider the user signed up with

<br>

### **GET `/user/fetchUser`**

Fetch the details of a user

#### **Headers:**

##### **\*Authorization** - The users JWT (e.g: token JWT_TOKEN)

<br>

### **POST `/category/newCategory`**

A route to make new categories. The user must be of admin level to utilize this route

#### **Body:**

##### **\*name** - The Category Name

#### **Headers:**

##### **\*Authorization** - The users JWT (e.g: token JWT_TOKEN)

<br>

### **GET `/category/findCategory`**

A route to search for available categories.

#### **Query Params:**

##### **q** - The query string (leave blank to fetch all)

<br>

### **POST `/resource/newResource`**

A route to make new resources.

#### **Body:**

##### **\*resource**

- ##### **\*title** - The Resource Title

- ##### **\*category** - The Object ID of the category this resource belongs to

- ##### **\*phone** - The Contact Number of the vendor

- ##### **\*location**

  - ##### **\*displayName** - The User Readable Address
  - ##### **\*coordinates**
    - ##### **\*lat** - Latitude
    - ##### **\*long** - Longitude

- ##### **description** - The Resource Description
- ##### **price** - The Price of the Resource

#### **Headers:**

##### **Authorization** - The users JWT (e.g: token JWT_TOKEN)

<br>
