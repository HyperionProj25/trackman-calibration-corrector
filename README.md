# TrackMan CSV Calibration Corrector

A web-based tool that corrects TrackMan baseball radar data when the physical setup doesn't match the calibrated parameters. Uses statistical distribution matching instead of simple geometric scaling for scientifically accurate corrections.

## 🎯 Purpose

TrackMan systems are calibrated for specific positioning (distance from plate, height, lateral offset). When the actual setup differs from calibration, all measurements need correction. This tool applies dynamic statistical corrections based on your specific setup parameters.

## ✨ Features

- **📊 Statistical Distribution Matching**: Uses real calibration data, not simple geometric scaling
- **🔧 Dynamic Parameter Input**: Calculates corrections based on YOUR specific setup differences
- **📈 Percentage Change Tracking**: Shows +/- % difference from previous parameter sets
- **📁 CSV File Processing**: Drag & drop upload with automatic column detection
- **📋 Copy-to-Clipboard**: Easy export of corrected values
- **🔄 Reset & Refresh**: Clean workflow with manual control
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🌐 Wix Studio Compatible**: Single HTML file, no external dependencies

## 🔬 Scientific Method

### Traditional Approach (WRONG):
```
Simple geometric scaling: corrected = original × distance_ratio
```

### Our Approach (CORRECT):
```
Statistical distribution matching: corrected = (original - miscalAvg) × scale + correctAvg
```

**Why This Matters**: TrackMan's internal calibration affects the entire statistical distribution of measurements in non-linear ways. Simple scaling gives incorrect results (like -11ft sideways measurements).

## 🚀 Quick Start

### Option 1: Direct Use
1. Download `trackman-calibration-corrector.html`
2. Open in any modern web browser
3. Enter your calibration parameters
4. Upload your TrackMan CSV file
5. Copy the corrected results

### Option 2: Wix Studio Deployment
1. Upload the HTML file to your Wix media library
2. Add an HTML iframe element to your page
3. Point the iframe to the uploaded file
4. Set dimensions (recommended: 100% width, 1200px+ height)

## 📋 Usage Instructions

1. **Set Calibration Parameters**: Enter your setup vs actual values
   - Setup Distance vs Actual Distance (feet)
   - Setup Side Position vs Actual Side Position (feet)
   - Setup Height vs Actual Height (feet)

2. **Click "Calculate Adjustment"**: Validates inputs and prepares correction factors

3. **Refresh Adjustment Summary**: Use the refresh button to see updated calculations with percentage changes

4. **Upload CSV File**: Select a TrackMan CSV containing "PlateLocHeight" and "PlateLocSide" columns

5. **Copy Results**: Use the copy buttons to get corrected values for your analysis

## 🎯 Correction Factors

**Reference Baseline**: 13ft→25ft distance change
- **Height Factor**: 1.082x (from real calibration study)
- **Side Factor**: 0.982x (from real calibration study)

**Dynamic Scaling**: Your specific setup parameters modify these factors proportionally using interpolation/extrapolation.

## 📊 Example Scenarios

| Setup | Actual | Distance Change | Height Factor | Side Factor |
|-------|--------|----------------|---------------|-------------|
| 13ft → 25ft | +12.0ft | 1.082x | 0.982x |
| 15ft → 30ft | +15.0ft (+25.0%) | 1.123x (+3.8%) | 0.945x (-3.8%) |
| 10ft → 20ft | +10.0ft (-16.7%) | 1.041x (-3.8%) | 1.019x (+3.8%) |

## 🔧 Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **File Processing**: HTML5 File API for CSV parsing
- **Clipboard**: Modern Clipboard API with fallback
- **Validation**: Real-time input validation and error handling
- **Responsive**: CSS Grid and Flexbox for mobile compatibility

## 📁 File Structure

```
trackman-calibration-corrector.html    # Main application (single file)
README.md                              # This documentation
app/                                   # React development version (optional)
```

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Requires HTTPS for clipboard functionality (automatic on Wix)

## 🤝 Contributing

This tool is based on real TrackMan calibration research. To contribute additional calibration scenarios:

1. Provide reference datasets with known setup parameters
2. Calculate statistical parameters (means, standard deviations)
3. Submit data for inclusion in the correction factor lookup table

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🔬 Research Background

Based on statistical analysis of TrackMan calibration data showing that:
- Distance changes affect perspective scaling non-linearly
- Internal calibration systems modify entire statistical distributions
- Simple geometric corrections produce invalid results
- Distribution matching provides scientifically accurate corrections

---

**Built for baseball coaches, analysts, and data scientists working with TrackMan pitch tracking data.**
