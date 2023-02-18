# Coroshop Frontend

Coroshop is a tech e-commerce with administrator options to add, edit or delete products, allowing users to write reviews and pay through PayPal or Stripe.

&nbsp;

## Links

- [Repo](https://github.com/JoanR99/coroshop-client 'Coroshop Frontend repo')
- [Backend](https://github.com/JoanR99/coroshop-server 'Coroshop Backend repo')
- [Live Demo](https://coroshop-client.vercel.app/ 'Live View')

&nbsp;

## Screenshots

![Home Page](/screenshots/coroshop.png 'Home Page')

![Login Page](/screenshots/cs-2.png 'Login Page')

![Products Page](/screenshots/cs-3.png 'Products Page')

![Product Page](/screenshots/cs-5.png 'Product Page')

&nbsp;

## Stack

![Vite] ![Typescript] ![React] ![Styled-Components] ![Redux]

I developed this app entirely with TypeScript, which allowed me to reduce errors. In the front, I used React as the base framework and managed the state with Redux Toolkit because it facilitates managing the client state and the server cache with his optional tool RTK Query. On the other hand, I use Styled Components for the UI styles because it facilitates the creation of UI components and does not require any configuration.

&nbsp;

## How to install and run

### Prerequisites

1. You need to have Node.js installed in your machine.
2. A Stripe publishable key.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/JoanR99/coroshop-client.git
   ```

2. Go to file

   ```sh
   cd coroshop-client
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Add .env file with variable "VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY" with your publishable stripe key.

5. Run server.

   ```sh
   npm run dev
   ```

6. You need to setup the backend. Follow the instructions on the [Backend Repo](https://github.com/JoanR99/coroshop-server 'Coroshop Backend repo')
   &nbsp;

## Author

**Joan Romero**

- [Profile](https://github.com/JoanR99 'Github Joan Romero')
- [Email](mailto:romerojoan1999@gmail.com?subject=Hi 'Hi!')
- [Linkedin](https://www.linkedin.com/in/joanr99/ 'Linkedin Joan Romero')
- [Portfolio](https://portfolio-joan-romero.vercel.app/ 'Portfolio Joan Romero')

[vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[react]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[styled-components]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
