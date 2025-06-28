# 🏦 Smart Loan Recovery System

A comprehensive FinTech web application that uses Machine Learning to predict loan recoverability and provides strategic recommendations for debt recovery.

## ✨ Features

### 🤖 **Machine Learning & Analytics**
- **Random Forest Classifier** for loan recovery prediction
- **K-Means Clustering** for customer segmentation
- **Real-time Analytics** with interactive charts
- **Model Performance Metrics** (Accuracy, Precision, Recall, AUC)
- **Feature Importance Analysis**
- **Confusion Matrix Visualization**

### 📊 **Advanced Analytics Dashboard**
- **Recovery Rate by Region** - Geographic analysis
- **Overdue Days Analysis** - Time-based recovery patterns
- **Loan Amount Distribution** - Value-based insights
- **Credit Score vs Recovery Probability** - Risk correlation
- **Heatmap Visualizations** - Multi-dimensional analysis
- **Customer Cluster Distribution** - Segmentation insights

### 🔍 **Enhanced Filtering & Search**
- **Multi-criteria Filtering** (Status, Cluster, Risk Level, Region)
- **Range-based Filters** (Amount, Overdue Days, Credit Score, Probability)
- **Filter Presets** - Save and load common filter combinations
- **Real-time Filter Summary** - Shows filtered results count
- **Predefined Presets**:
  - High Risk Loans (<40% probability)
  - Recoverable Loans (≥70% probability)
  - Large Amounts (>$50,000)
  - Long Overdue (>90 days)

### 📤 **Export Functionality**
- **CSV Export** - Standard data export
- **Excel Export** - Formatted spreadsheet with recommendations
- **JSON Export** - API-friendly data format
- **Custom Headers** - Professional column names
- **Recommendations Column** - Actionable insights included

### 💡 **Recovery Recommendations**
- **Call Scripts** - Professional conversation templates
  - Initial Contact Script
  - Follow-up Script
  - Final Notice Script
- **Email Templates** - Pre-written communication
  - Friendly Reminder
  - Formal Demand Letter
- **Legal Documents** - Standard forms
  - Final Demand Letter
  - Payment Plan Agreement
- **Best Practices** - Industry guidelines
- **Performance Metrics** - KPI tracking

### 🎯 **Strategic Features**
- **Risk-based Recovery Strategies**
  - Recoverable (70-100%): Gentle reminders, payment plans
  - Risky (40-70%): Urgent calls, formal demands
  - Unrecoverable (0-40%): Legal action, collection agencies
- **Success Stories** - Case study examples
- **Performance KPIs** - Recovery rate, response time, resolution time

## 🚀 **Quick Start**

### Prerequisites
- Python 3.8+
- AWS Account (for S3 integration)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd loan
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your AWS credentials
   ```

5. **Run the application**
   ```bash
   python app.py  # With AWS S3
   # OR
   python app_local.py  # Local version
   ```

6. **Access the application**
   - Open browser: `http://localhost:5000`
   - Login: `admin` / `password`

## 📁 **Project Structure**

```
loan/
├── app.py                 # Main Flask app with AWS S3
├── app_local.py          # Local version without AWS
├── templates/            # HTML templates
│   ├── base.html         # Base template
│   ├── dashboard.html    # Main dashboard
│   ├── index.html        # Landing page
│   └── recommendations.html # Recovery strategies
├── uploads/              # File upload directory
├── venv/                 # Virtual environment
└── README.md            # This file
```

## �� **Configuration**

### AWS S3 Setup (Optional)
1. Create AWS IAM user with S3 permissions
2. Generate access keys
3. Update `config.env`:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=your_region
   ```

### Environment Variables
```env
FLASK_SECRET_KEY=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1
```

## 📊 **Data Format**

### Required CSV Columns
```csv
loan_amount,overdue_days,credit_score,region
50000,30,750,North
75000,60,650,South
100000,90,550,East
```

### Supported Data Types
- **loan_amount**: Numeric (loan value in USD)
- **overdue_days**: Numeric (days past due)
- **credit_score**: Numeric (300-850 range)
- **region**: Text (optional, for geographic analysis)

## 🎯 **Usage Guide**

### 1. **Upload Data**
- Navigate to the dashboard
- Click "Upload CSV" button
- Select your loan data file
- Wait for ML processing

### 2. **View Predictions**
- Browse the predictions table
- Use filters to find specific loans
- Click recommendation buttons for insights

### 3. **Analyze Data**
- Explore interactive charts
- View model performance metrics
- Export data in various formats

### 4. **Get Recommendations**
- Visit the Recommendations page
- Access call scripts and templates
- Review best practices

## 🔍 **Filtering Options**

### Basic Filters
- **Recovery Status**: Recoverable, Risky, Unrecoverable
- **Cluster**: Customer segments (0, 1, 2)
- **Risk Level**: Low (≥70%), Medium (40-70%), High (<40%)
- **Region**: Geographic location

### Advanced Filters
- **Loan Amount Range**: Min/Max values
- **Overdue Days Range**: Time-based filtering
- **Credit Score Range**: Risk-based filtering
- **Probability Range**: ML confidence levels

### Filter Presets
- **High Risk Loans**: Probability < 40%
- **Recoverable Loans**: Probability ≥ 70%
- **Large Amounts**: Amount > $50,000
- **Long Overdue**: Overdue > 90 days

## 📈 **Analytics Features**

### Charts & Visualizations
- **Pie Charts**: Recovery status distribution
- **Bar Charts**: Cluster distribution, amount analysis
- **Line Charts**: Overdue days trends
- **Scatter Plots**: Credit score vs probability
- **Heatmaps**: Multi-dimensional analysis

### Model Metrics
- **Accuracy**: Overall prediction accuracy
- **Precision**: True positive rate
- **Recall**: Sensitivity
- **AUC Score**: Model discrimination ability
- **Feature Importance**: Key factors in predictions

## 🛠 **Technical Stack**

### Backend
- **Flask**: Web framework
- **Scikit-learn**: Machine learning
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing
- **Plotly**: Interactive charts

### Frontend
- **Bootstrap 5**: UI framework
- **JavaScript**: Interactive features
- **Chart.js**: Data visualization
- **Font Awesome**: Icons

### Cloud Integration
- **AWS S3**: File storage
- **Boto3**: AWS SDK
- **Flask-Login**: Authentication

## 🔒 **Security Features**

- **User Authentication**: Login system
- **Session Management**: Secure sessions
- **File Upload Validation**: CSV format checking
- **Input Sanitization**: XSS protection
- **Environment Variables**: Secure configuration

## 📱 **Responsive Design**

- **Mobile-friendly**: Works on all devices
- **Modern UI**: Clean, professional interface
- **Accessibility**: Screen reader compatible
- **Cross-browser**: Works on all major browsers

## 🚀 **Deployment Options**

### Local Development
```bash
python app_local.py
```

### Production with AWS
```bash
python app.py
```

### Docker Deployment
```bash
docker build -t loan-recovery .
docker run -p 5000:5000 loan-recovery
```

## 🔧 **Customization**

### Adding New Features
1. Extend the ML model in `initialize_ml_model()`
2. Add new routes in Flask app
3. Create new templates in `templates/`
4. Update JavaScript functions

### Modifying Analytics
1. Edit chart configurations in `/analytics` route
2. Add new metrics in `/model_metrics` route
3. Update dashboard JavaScript

### Custom Recommendations
1. Modify `get_recovery_recommendations()` function
2. Add new templates in recommendations page
3. Update call scripts and email templates

## 📞 **Support**

For questions or issues:
1. Check the documentation
2. Review error logs
3. Test with sample data
4. Contact support team

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for the FinTech community** 