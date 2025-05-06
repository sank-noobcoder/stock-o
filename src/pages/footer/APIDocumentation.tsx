
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, Code, Server, Key, Database, Webhook, BookOpen, FileJson, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const APIDocumentation: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('•••••••••••••••••••••••••••••••');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const generateApiKey = () => {
    // In a real app, this would be a server call
    const newKey = 'sk_' + Array(32).fill(0).map(() => 
      Math.random().toString(36).charAt(2)
    ).join('');
    
    setApiKey(newKey);
    toast({
      title: "New API Key Generated",
      description: "Your new API key has been generated. Keep it secure!",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            Integrate with StockOracle's powerful prediction and analytics APIs
          </p>
        </div>
        
        <Tabs defaultValue="getting-started" className="space-y-8">
          <div className="overflow-x-auto -mx-4 px-4">
            <TabsList className="w-full max-w-xl flex-nowrap">
              <TabsTrigger value="getting-started" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 hidden sm:block" />
                <span>Getting Started</span>
              </TabsTrigger>
              <TabsTrigger value="endpoints" className="flex items-center">
                <Server className="h-4 w-4 mr-2 hidden sm:block" />
                <span>Endpoints</span>
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="flex items-center">
                <Key className="h-4 w-4 mr-2 hidden sm:block" />
                <span>API Keys</span>
              </TabsTrigger>
              <TabsTrigger value="sdks" className="flex items-center">
                <Code className="h-4 w-4 mr-2 hidden sm:block" />
                <span>Client SDKs</span>
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="flex items-center">
                <Webhook className="h-4 w-4 mr-2 hidden sm:block" />
                <span>Webhooks</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with StockOracle API</CardTitle>
                <CardDescription>Learn how to integrate with our API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Introduction</h3>
                  <p className="text-muted-foreground">
                    The StockOracle API provides programmatic access to our stock prediction and financial analysis tools. You can use our API to build custom trading applications, create automated trading strategies, or integrate our predictions into your existing financial software.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  <p className="text-muted-foreground">
                    All API requests require authentication using API keys. You can generate an API key from the "API Keys" tab.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="flex justify-between">
                      <code>
                        curl -X GET "https://api.stockoracle.ai/v1/predictions" \<br />
                        &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0" 
                        onClick={() => copyToClipboard('curl -X GET "https://api.stockoracle.ai/v1/predictions" -H "Authorization: Bearer YOUR_API_KEY"', 'auth-curl')}
                      >
                        {copied === 'auth-curl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Rate Limits</h3>
                  <p className="text-muted-foreground">
                    Free accounts are limited to 100 requests per day. Premium accounts have higher limits based on their subscription tier.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Example Request</h3>
                  <div className="bg-muted/30 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="flex justify-between">
                      <code>
                        curl -X GET "https://api.stockoracle.ai/v1/predictions/AAPL" \<br />
                        &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                        &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                        &nbsp;&nbsp;-d '{"{"}timeframe: "7d", confidence: "high"{"}"}'
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0" 
                        onClick={() => copyToClipboard('curl -X GET "https://api.stockoracle.ai/v1/predictions/AAPL" -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d \'{"timeframe": "7d", "confidence": "high"}\'', 'example-curl')}
                      >
                        {copied === 'example-curl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full sm:w-auto" variant="outline">
                  Read Full Documentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Available endpoints for the StockOracle API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Endpoint 1 */}
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">GET</Badge>
                        <span className="font-mono text-sm">/v1/predictions/:symbol</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/10">Free & Premium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get price predictions for a specific stock symbol
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-medium">Parameters:</p>
                      <ul className="text-xs text-muted-foreground">
                        <li><span className="font-mono">symbol</span> - Stock symbol (e.g., AAPL, MSFT)</li>
                        <li><span className="font-mono">timeframe</span> - Prediction timeframe (1d, 7d, 30d, 90d)</li>
                        <li><span className="font-mono">confidence</span> - Confidence level (low, medium, high)</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Endpoint 2 */}
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/10">POST</Badge>
                        <span className="font-mono text-sm">/v1/portfolio/analysis</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/10">Premium Only</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Analyze an entire portfolio for risk assessment and optimization
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-medium">Request Body:</p>
                      <div className="text-xs text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                        {"{"}
                        <br />
                        &nbsp;&nbsp;"positions": [
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;{"{"} "symbol": "AAPL", "quantity": 10 {"}"},
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;{"{"} "symbol": "MSFT", "quantity": 5 {"}"}
                        <br />
                        &nbsp;&nbsp;],
                        <br />
                        &nbsp;&nbsp;"riskTolerance": "moderate"
                        <br />
                        {"}"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Endpoint 3 */}
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">GET</Badge>
                        <span className="font-mono text-sm">/v1/market/news</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/10">Free & Premium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get the latest market news with sentiment analysis
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-medium">Parameters:</p>
                      <ul className="text-xs text-muted-foreground">
                        <li><span className="font-mono">symbols</span> - Comma-separated stock symbols</li>
                        <li><span className="font-mono">limit</span> - Number of news items (default: 10, max: 50)</li>
                        <li><span className="font-mono">sentiment</span> - Filter by sentiment (positive, negative, neutral)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>API Keys</span>
                  <Button onClick={generateApiKey}>Generate New Key</Button>
                </CardTitle>
                <CardDescription>Manage your API keys for authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your API Key</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        value={apiKey} 
                        readOnly 
                        className="font-mono"
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          if (apiKey.includes('•')) {
                            toast({
                              title: "Unable to copy",
                              description: "Generate a new API key first.",
                              variant: "destructive"
                            });
                            return;
                          }
                          copyToClipboard(apiKey, 'api-key');
                        }}
                      >
                        {copied === 'api-key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Keep your API key secure and don't share it publicly. You can regenerate your key at any time.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">API Usage</h3>
                    <p className="text-sm text-muted-foreground">
                      Your current usage: 45/100 calls (Free tier)
                    </p>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Premium for increased API call limits and additional endpoints.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Example Usage</h3>
                    <div className="bg-muted/30 p-4 rounded-md text-sm font-mono overflow-x-auto">
                      <div className="flex justify-between">
                        <code>
                          # Using Python<br />
                          import requests<br /><br />
                          
                          headers = {'{'}
                          <br />
                          &nbsp;&nbsp;'Authorization': 'Bearer YOUR_API_KEY'
                          <br />
                          {'}'}<br /><br />
                          
                          response = requests.get(
                          <br />
                          &nbsp;&nbsp;'https://api.stockoracle.ai/v1/predictions/AAPL',
                          <br />
                          &nbsp;&nbsp;headers=headers
                          <br />
                          )
                          <br /><br />
                          
                          data = response.json()
                          <br />
                          print(data)
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0" 
                          onClick={() => copyToClipboard(`import requests\n\nheaders = {\n  'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get(\n  'https://api.stockoracle.ai/v1/predictions/AAPL',\n  headers=headers\n)\n\ndata = response.json()\nprint(data)`, 'python-example')}
                        >
                          {copied === 'python-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Client SDKs Tab */}
          <TabsContent value="sdks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client SDKs</CardTitle>
                <CardDescription>Official client libraries for the StockOracle API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Python SDK */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Python SDK</CardTitle>
                        <Badge>v1.2.0</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Official Python SDK for the StockOracle API with full type support and async capabilities.
                      </p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm font-mono">
                        <div className="flex justify-between">
                          <code>pip install stockoracle-sdk</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="flex-shrink-0" 
                            onClick={() => copyToClipboard('pip install stockoracle-sdk', 'python-pip')}
                          >
                            {copied === 'python-pip' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button variant="outline" size="sm">
                        View on GitHub
                      </Button>
                      <Button size="sm">
                        Documentation
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* JavaScript SDK */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">JavaScript SDK</CardTitle>
                        <Badge>v1.3.1</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm text-muted-foreground">
                        TypeScript-ready JavaScript SDK for browsers and Node.js with Promise-based API.
                      </p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm font-mono">
                        <div className="flex justify-between">
                          <code>npm install @stockoracle/sdk</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="flex-shrink-0" 
                            onClick={() => copyToClipboard('npm install @stockoracle/sdk', 'js-npm')}
                          >
                            {copied === 'js-npm' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button variant="outline" size="sm">
                        View on GitHub
                      </Button>
                      <Button size="sm">
                        Documentation
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Java SDK */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Java SDK</CardTitle>
                        <Badge>v0.9.4</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Java SDK with Maven integration and comprehensive exception handling.
                      </p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm font-mono overflow-x-auto">
                        <div className="flex justify-between">
                          <code>
                            {'<dependency>'}
                            <br />
                            {'  <groupId>ai.stockoracle</groupId>'}
                            <br />
                            {'  <artifactId>stockoracle-sdk</artifactId>'}
                            <br />
                            {'  <version>0.9.4</version>'}
                            <br />
                            {'</dependency>'}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="flex-shrink-0" 
                            onClick={() => copyToClipboard('<dependency>\n  <groupId>ai.stockoracle</groupId>\n  <artifactId>stockoracle-sdk</artifactId>\n  <version>0.9.4</version>\n</dependency>', 'java-maven')}
                          >
                            {copied === 'java-maven' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button variant="outline" size="sm">
                        View on GitHub
                      </Button>
                      <Button size="sm">
                        Documentation
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Go SDK */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Go SDK</CardTitle>
                        <Badge>v0.8.2</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Lightweight Go client for the StockOracle API with context support.
                      </p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm font-mono">
                        <div className="flex justify-between">
                          <code>go get github.com/stockoracle/go-sdk</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="flex-shrink-0" 
                            onClick={() => copyToClipboard('go get github.com/stockoracle/go-sdk', 'go-get')}
                          >
                            {copied === 'go-get' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button variant="outline" size="sm">
                        View on GitHub
                      </Button>
                      <Button size="sm">
                        Documentation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Webhooks</span>
                  <Button>Create Webhook</Button>
                </CardTitle>
                <CardDescription>Receive real-time notifications for stock events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Overview</h3>
                    <p className="text-muted-foreground">
                      Webhooks allow you to receive real-time notifications when certain events occur, such as price alerts, prediction updates, or significant market news. Configure endpoints where StockOracle can send POST requests with event data.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Available Events</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Badge className="mr-2">price.alert</Badge>
                        <span className="text-muted-foreground">Triggered when a stock reaches your specified price target</span>
                      </li>
                      <li className="flex items-center">
                        <Badge className="mr-2">prediction.updated</Badge>
                        <span className="text-muted-foreground">Triggered when our AI updates predictions for stocks you follow</span>
                      </li>
                      <li className="flex items-center">
                        <Badge className="mr-2">news.significant</Badge>
                        <span className="text-muted-foreground">Triggered for major news affecting stocks in your watchlist</span>
                      </li>
                      <li className="flex items-center">
                        <Badge className="mr-2 bg-amber-500/10 text-amber-500 border-amber-500/10">volatility.spike</Badge>
                        <span className="text-muted-foreground">Triggered when unusual volatility is detected (Premium only)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Example Payload</h3>
                    <div className="bg-muted/30 p-4 rounded-md text-sm font-mono overflow-x-auto">
                      <div className="flex justify-between">
                        <code>
                          {"{"}
                          <br />
                          &nbsp;&nbsp;"event": "price.alert",
                          <br />
                          &nbsp;&nbsp;"created_at": "2023-10-12T15:32:21Z",
                          <br />
                          &nbsp;&nbsp;"data": {"{"}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;"symbol": "AAPL",
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;"price": 142.58,
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;"target_price": 142.50,
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;"alert_type": "above",
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;"created_at": "2023-10-10T09:15:00Z"
                          <br />
                          &nbsp;&nbsp;{"}"}
                          <br />
                          {"}"}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0" 
                          onClick={() => copyToClipboard('{\n  "event": "price.alert",\n  "created_at": "2023-10-12T15:32:21Z",\n  "data": {\n    "symbol": "AAPL",\n    "price": 142.58,\n    "target_price": 142.50,\n    "alert_type": "above",\n    "created_at": "2023-10-10T09:15:00Z"\n  }\n}', 'webhook-payload')}
                        >
                          {copied === 'webhook-payload' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Setting Up Webhooks</h3>
                    <p className="text-muted-foreground">
                      To set up a webhook, you need to:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Create a publicly accessible endpoint on your server</li>
                      <li>Configure the webhook in your StockOracle dashboard</li>
                      <li>Implement signature verification for security</li>
                      <li>Process the incoming webhook payload</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Signature Verification</h3>
                    <p className="text-muted-foreground">
                      All webhook requests include a <span className="font-mono">X-StockOracle-Signature</span> header. Verify this signature to ensure the request came from StockOracle.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-md text-sm font-mono overflow-x-auto">
                      <div className="flex justify-between">
                        <code>
                          # Python example<br />
                          import hmac<br />
                          import hashlib<br /><br />
                          
                          def verify_signature(payload, signature, secret):<br />
                          &nbsp;&nbsp;expected = hmac.new(<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;secret.encode('utf-8'),<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;payload.encode('utf-8'),<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;hashlib.sha256<br />
                          &nbsp;&nbsp;).hexdigest()<br /><br />
                          
                          &nbsp;&nbsp;return hmac.compare_digest(expected, signature)<br />
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0" 
                          onClick={() => copyToClipboard('import hmac\nimport hashlib\n\ndef verify_signature(payload, signature, secret):\n  expected = hmac.new(\n    secret.encode(\'utf-8\'),\n    payload.encode(\'utf-8\'),\n    hashlib.sha256\n  ).hexdigest()\n\n  return hmac.compare_digest(expected, signature)', 'signature-verification')}
                        >
                          {copied === 'signature-verification' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full sm:w-auto" variant="outline">
                  <FileJson className="mr-2 h-4 w-4" />
                  View Webhook Logs
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default APIDocumentation;
