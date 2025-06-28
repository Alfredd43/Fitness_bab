# 🏦 Smart Loan Recovery System

A FinTech web application that uses Machine Learning to predict loan recoverability and provides strategic recommendations for debt recovery.

## ✨ Features

- **ML-powered predictions** using Random Forest Classifier
- **Interactive analytics dashboard** with charts and visualizations
- **Advanced filtering** with presets for different risk levels
- **Export functionality** (CSV, Excel, JSON)
- **Recovery recommendations** with call scripts and email templates
- **Customer segmentation** using K-Means clustering

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- AWS Account (optional, for S3 integration)

### Installation

1. **Clone and setup**
```bash
git clone https://github.com/Alfredd43/loan_recovery.git
cd loan_recovery
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

2. **Configure environment**
```bash
cp config.env.example config.env
# Edit config.env with your credentials
```

3. **Run the application**
```bash
python app.py  # With AWS S3
# OR
python app_local.py  # Local version
```

4. **Access the app**
- Open: `http://localhost:5000`
- Login: `admin` / `password`

## 📊 Data Format

CSV file with columns:
```
loan_amount,overdue_days,credit_score,region
50000,30,750,North
75000,60,650,South
```

## 🎯 Usage

1. **Upload CSV** with loan data
2. **View predictions** and analytics
3. **Filter results** by risk level, amount, region
4. **Export data** in various formats
5. **Get recommendations** for recovery strategies

## 🔧 Configuration

### Environment Variables
```
FLASK_SECRET_KEY=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1
```

## 🛠 Tech Stack

- **Backend**: Flask, Scikit-learn, Pandas, NumPy
- **Frontend**: Bootstrap 5, Chart.js, JavaScript
- **Cloud**: AWS S3 (optional)

## 📁 Project Structure

```
loan_recovery/
├── app.py                 # Main Flask app with AWS S3
├── app_local.py          # Local version
├── templates/            # HTML templates
├── uploads/              # File upload directory
└── requirements.txt      # Python dependencies
```

## 🔒 Security

- User authentication
- Session management
- File upload validation
- Environment variable configuration

## 📱 Features

- **Responsive design** - works on all devices
- **Real-time analytics** - interactive charts
- **Filter presets** - High risk, Recoverable, Large amounts
- **Export options** - CSV, Excel, JSON with recommendations
- **Recovery strategies** - Call scripts, email templates, legal docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for the FinTech community** 