# AmazonClone Client

![AmazonClone Logo](link-to-your-logo.png)

## Overview

AmazonClone is a full-stack e-commerce platform. This repository contains the client-side implementation built with React, utilizing various libraries and technologies for a modern web application.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Run the Application](#run-the-application)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
  - [React](#react)
  - [Redux](#redux)
  - [React Query](#react-query)
  - [React Router](#react-router)
  - [Tailwind CSS](#tailwind-css)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:**

  - Sign Up and Login functionalities.

- **Product Management:**

  - Browse and filter products.
  - View product details and reviews.

- **Shopping Cart:**

  - Add products to the shopping cart.
  - Remove products from the cart.
  - Proceed to checkout.

- **Seller Dashboard:**

  - View and manage products as a seller.

  # Technologies Used

## React

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.

**Usage:**

- **Reusable Components:** Organize your application into reusable components for better maintainability.
- **React Hooks:** Leverage React Hooks for managing component state and lifecycle.
- **JSX Syntax:** Utilize JSX syntax for declarative UI.

## Redux

[Redux](https://redux.js.org/) is a predictable state container for JavaScript apps. It helps manage the state of the application in a single global store, making it easier to handle complex state logic and interactions.

**Usage:**

- **Centralized State Management:** Manage user authentication, shopping cart, and other global application states in a centralized manner.
- **Action-Reducer Pattern:** Organize actions, reducers, and selectors to maintain a clean and scalable codebase.
- **React-Redux Integration:** Integrate with React using `react-redux` to connect components to the Redux store.

## React Query

[React Query](https://react-query.tanstack.com/) is a library for managing, caching, and updating remote and local data in React applications.

**Usage:**

- **Efficient Data Fetching:** Fetch and manage data from the server efficiently.
- **Data Caching:** Cache and update data in response to user actions.
- **Automatic Refetching:** Provide a seamless user experience with automatic refetching and optimistic updates.
- **Hooks Usage:** Leverage `useQuery` and `useMutation` hooks for data fetching and mutation.

## React Router

[React Router](https://reactrouter.com/) is a declarative routing library for React applications.

**Usage:**

- **Declarative Navigation:** Define and handle navigation in a React application.
- **SPA Experience:** Enable a single-page application (SPA) experience by dynamically rendering components based on the route.
- **React Router Components:** Utilize `BrowserRouter`, `Route`, and `Link` components to manage navigation.

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup.

**Usage:**

- **Utility Classes:** Rapidly style components and layouts with utility classes.
- **Consistent Design:** Achieve a consistent and responsive design without writing custom CSS.
- **Customization:** Customize and extend the default Tailwind configuration to fit the project's design system.
- **Integration:** Leverage the utility classes for styling components, layouts, and responsive design.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/maran077/amazonClone-client.git
cd amazonClone-client
```
