# Policy Co-Pilot

Policy Co-Pilot is an advanced AI-powered platform for managing, scanning, and auditing organizational policies with ease. It features a sleek, modern interface for both Analysts and Admins, providing deep insights into compliance and security.

## 🚀 Getting Started

The project is located in the `intent-policy-copilot` directory.

### Prerequisites

- Node.js (>= 18.17.0)
- npm or yarn

### Installation

```bash
cd intent-policy-copilot
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4+
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts

## 📦 Deployment

### Vercel

To deploy this project on Vercel:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. **Important**: Set the **Root Directory** to `intent-policy-copilot` in the Vercel Project Settings.
4. Vercel will automatically detect Next.js and handle the build process using the custom `vercel.json` configuration (which includes optimized security headers).

### GitHub Push

1. Initialize a git repository if you haven't already:
   ```bash
   git init
   ```
2. Add all files:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Initialize Policy Co-Pilot project"
   ```
4. Push to your remote repository:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

## 📄 License

Individual/Company License - See implementation proposal PDF for details.
