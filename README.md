# Scissor - URL Shortening App

Scissor is a full-featured URL shortening application that allows users to shorten URLs, generate QR codes, view analytics, and manage their shortened URLs. The app supports both guest users and registered users, with additional features available for registered users such as custom URL slugs, URL management, and markdown content creation.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Firebase Setup](#firebase-setup)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Features

### Guest Users
- **URL Shortening**: Paste a long URL and generate a shortened version.
- **QR Code Generation**: Generate a QR code for the shortened URL.

### Registered Users
- **Custom URL Slugs**: Create custom short codes for your URLs.
- **URL Management**: Edit, disable, delete, and revert shortened URLs.
- **Analytics**: View click statistics and user locations for each shortened URL.
- **Markdown Content**: Create and manage markdown content.

## Technology Stack

- **Frontend**: React, TypeScript, CSS
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **QR Code Generation**: `qrcode.react`
- **Testing**: Jest, React Testing Library

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase CLI

### Clone the Repository

```bash
git clone https://github.com/beingadam1/scissor.git
cd scissor
