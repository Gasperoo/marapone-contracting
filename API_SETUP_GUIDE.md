# Real-Time Cargo Tracking API Setup Guide

This guide will help you obtain and configure API keys for real-time cargo tracking in GasperTool.

## Overview

GasperTool integrates with free APIs to provide real-time tracking for:
- **Vessels**: AISStream.io (WebSocket API)
- **Flights**: OpenSky Network (REST API)
- **Rail**: Enhanced simulation (no free real-time API available)

## 1. AISStream.io (Vessel Tracking)

### Features
- Real-time global AIS (Automatic Identification System) data
- WebSocket streaming for live updates
- Vessel positions, speeds, headings, and destinations
- Free tier with unlimited messages

### Setup Steps

1. **Register for an Account**
   - Visit: https://aisstream.io
   - Click "Sign Up" or "Get Started"
   - Create a free account with your email

2. **Get Your API Key**
   - Log in to your AISStream dashboard
   - Navigate to "API Keys" section
   - Copy your API key

3. **Add to Environment Variables**
   ```bash
   VITE_AISSTREAM_API_KEY=your_actual_api_key_here
   VITE_ENABLE_REAL_TRACKING=true
   ```

### Rate Limits
- **Free Tier**: Unlimited WebSocket messages
- **Connection**: One active WebSocket connection per API key
- **Coverage**: Global AIS data from satellites and terrestrial stations

## 2. MyShipTracking.com (Vessel Tracking - Paid Alternative)

### Features
- Real-time vessel tracking with REST API
- Better terrestrial AIS coverage in some regions
- Historical data and port calls
- Fleet management capabilities
- Credit-based pricing model

### Setup Steps

1. **Register for an Account**
   - Visit: https://www.myshiptracking.com
   - Click "Sign Up" or create an account
   - Choose a pricing plan (credit-based)

2. **Get Your API Key**
   - Log in to your MyShipTracking dashboard
   - Navigate to "API" or "Account" section
   - Generate and copy your API key

3. **Add to Environment Variables**
   ```bash
   VITE_MYSHIPTRACKING_API_KEY=your_actual_api_key_here
   VITE_ENABLE_REAL_TRACKING=true
   ```

### Rate Limits \u0026 Pricing
- **Credit-based**: Each API call consumes credits
- **Zone queries**: Returns up to 500 vessels per zone
- **Recommended**: 30-second refresh interval to conserve credits
- **Coverage**: Primarily terrestrial AIS (limited offshore coverage)

### Priority
- If both AISStream and MyShipTracking keys are configured, **MyShipTracking takes priority**
- If AISHub username is configured, **AISHub takes priority over AISStream**
- Priority order: MyShipTracking > AISHub > AISStream
- MyShipTracking provides better coverage in some coastal regions
- AISHub provides good regional coverage (requires AIS feed contribution)
- AISStream provides better global satellite coverage

## 3. AISHub.net (Vessel Tracking - Free with Contribution)

### Features
- Real-time vessel tracking with REST API
- **Free** when you contribute an AIS feed
- Good regional coverage
- JSON/XML/CSV output formats
- Historical data and vessel search

### Setup Steps

1. **Set Up an AIS Feeder**
   - You need to contribute AIS data to get free API access
   - Requirements:
     - Coverage of at least 10 vessels
     - 90% uptime
     - Maximum 60-second downsampling
     - Maximum 10-second delay for AIS messages
   - Visit: https://www.aishub.net/how-to-share

2. **Register Your Feed**
   - Once your feeder meets requirements, register at https://www.aishub.net
   - You'll receive a username for API access

3. **Add to Environment Variables**
   ```bash
   VITE_AISHUB_USERNAME=your_aishub_username_here
   VITE_ENABLE_REAL_TRACKING=true
   ```

### Rate Limits
- **Free with contribution**: Generous limits for contributors
- **Refresh interval**: 60 seconds (recommended)
- **Coverage**: Primarily terrestrial AIS from your region and other contributors

### Note
- This is the best **free** option if you can set up an AIS feeder
- Requires technical setup (AIS receiver + software)
- Great for regional/coastal coverage

## 4. OpenSky Network (Flight Tracking with Cargo Filter)

### Features
- Real-time flight positions worldwide
- Aircraft metadata (callsign, altitude, velocity)
- Free tier with reasonable rate limits
- Optional authentication for higher limits

### Setup Steps

1. **Anonymous Access (Basic)**
   - No registration required
   - 400 API requests per day
   - Simply enable real-time tracking:
   ```bash
   VITE_ENABLE_REAL_TRACKING=true
   ```

2. **Registered Access (Recommended)**
   - Visit: https://opensky-network.org
   - Click "Sign Up" in the top right
   - Create a free account
   - Add credentials to environment:
   ```bash
   VITE_OPENSKY_NETWORK_USERNAME=your_username
   VITE_OPENSKY_NETWORK_PASSWORD=your_password
   VITE_ENABLE_REAL_TRACKING=true
   ```

### Rate Limits
- **Anonymous**: 400 requests/day
- **Registered**: 4,000 requests/day
- **Credits**: Can contribute data for higher limits

## 3. Configuration

### Environment File Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your API keys:
   ```bash
   # Real-Time Tracking APIs
   VITE_ENABLE_REAL_TRACKING=true
   VITE_AISSTREAM_API_KEY=your_aisstream_key
   VITE_OPENSKY_NETWORK_USERNAME=your_opensky_username
   VITE_OPENSKY_NETWORK_PASSWORD=your_opensky_password
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

## 4. Testing the Integration

### Verify Connection

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Navigate to GasperTool**:
   - Open http://localhost:5173
   - Go to Products → GasperTool
   - Click on "Live Tracking Map" tab

3. **Check the status indicator**:
   - Green dot = Connected and receiving data
   - Red dot = Connection failed or disabled

### What to Expect

- **Vessels**: Should appear along coastlines and major shipping lanes (may take 30-60 seconds for first data)
- **Flights**: Should appear near major airports and flight corridors (updates every 10 seconds)
- **Rail**: Always visible (simulated data with realistic routes)

### Filter by Type

Use the filter buttons to view specific transport modes:
- **All**: Shows all tracked vehicles
- **🚢 Vessels**: Maritime traffic only
- **✈️ Flights**: Aircraft only
- **🚆 Rail**: Freight trains only

## 5. Troubleshooting

### No Vessels Appearing

**Possible Causes**:
- Invalid AISStream API key
- WebSocket connection blocked by firewall
- No vessels in current map view

**Solutions**:
1. Check browser console for errors
2. Verify API key is correct in `.env`
3. Zoom to coastal areas or major ports
4. Wait 60 seconds for initial data stream

### No Flights Appearing

**Possible Causes**:
- Rate limit exceeded
- OpenSky Network API temporarily unavailable
- No flights in current map view

**Solutions**:
1. Check browser console for 429 (rate limit) errors
2. Register for OpenSky account to increase limits
3. Zoom to major airports or flight corridors
4. Wait for next update cycle (10 seconds)

### Connection Status Shows Red

**Possible Causes**:
- `VITE_ENABLE_REAL_TRACKING` not set to `true`
- Missing API keys
- Network connectivity issues

**Solutions**:
1. Verify `.env` file configuration
2. Restart development server after changing `.env`
3. Check network connection
4. Review browser console for specific errors

## 6. Fallback Behavior

If real-time tracking is disabled or APIs fail:
- System automatically falls back to simulated rail data
- No error messages shown to users
- Graceful degradation ensures map always displays content

## 7. Production Deployment

### Environment Variables

When deploying to production, ensure environment variables are set in your hosting platform:

**Vercel/Netlify**:
```bash
VITE_ENABLE_REAL_TRACKING=true
VITE_AISSTREAM_API_KEY=your_key
VITE_OPENSKY_NETWORK_USERNAME=your_username
VITE_OPENSKY_NETWORK_PASSWORD=your_password
```

**GitHub Actions**:
Add secrets to repository settings and reference in workflow.

### Security Notes

- API keys are exposed in client-side code (acceptable for free tier APIs)
- AISStream and OpenSky are designed for public use
- No sensitive data transmitted
- Rate limits prevent abuse

## 8. API Documentation

- **AISStream**: https://aisstream.io/documentation
- **OpenSky Network**: https://openskynetwork.github.io/opensky-api/

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify API keys are valid
3. Test API endpoints directly (see documentation links)
4. Review the implementation in `src/services/realTimeTrackingService.js`
