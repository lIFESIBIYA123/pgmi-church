'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Building2,
  Heart,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  Gift,
  Users,
  Globe,
  BookOpen
} from "lucide-react";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import Image from "next/image";
import Link from "next/link";

export default function GivingPage() {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('tithe');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const donationTypes = [
    { value: 'tithe', label: 'Tithe (10%)', description: 'Biblical tithing for church operations' },
    { value: 'offering', label: 'Offering', description: 'Additional giving beyond tithe' },
    { value: 'missions', label: 'Missions', description: 'Support for local and global missions' },
    { value: 'building', label: 'Building Fund', description: 'Church facility and expansion projects' },
    { value: 'youth', label: 'Youth Ministry', description: 'Support for youth programs and activities' },
    { value: 'outreach', label: 'Outreach', description: 'Community service and outreach programs' },
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Secure online payment' },
    { value: 'bank', label: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' },
    { value: 'check', label: 'Check/Money Order', icon: DollarSign, description: 'Traditional payment methods' },
  ];

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle success/error here
    }, 3000);
  };

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <BackgroundSlideshow
          pageKey="giving"
          interval={180000} // 3 minutes
          className="z-0"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/images/pgmi logo.png"
              alt="PGMI Logo"
              width={120}
              height={120}
              className="mx-auto mb-6"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Online Giving
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Support our ministry and mission through secure online giving. Every gift makes a difference in our community and beyond.
          </p>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Give?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Biblical Principle</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Giving is a biblical principle that honors God and supports His work.
                  &ldquo;Bring the whole tithe into the storehouse&rdquo; - Malachi 3:10
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your gifts directly impact our community through ministries, outreach programs,
                  and support for families in need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Global Missions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Support missionaries and projects around the world, spreading the Gospel
                  and providing humanitarian aid.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Giving Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Make a Donation</CardTitle>
                <CardDescription className="text-lg">
                  Choose your amount and payment method to support our ministry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonation} className="space-y-6">
                  {/* Donation Type */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Donation Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {donationTypes.map((type) => (
                        <div
                          key={type.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            donationType === type.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setDonationType(type.value)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{type.label}</p>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                            {donationType === type.value && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Amount</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount.toString() ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount.toString())}
                          className="h-12"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-10 h-12 text-lg"
                        min="1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Payment Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            paymentMethod === method.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod(method.value)}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-semibold">{method.label}</p>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isProcessing || !donationAmount}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Give ${donationAmount || '0'}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Giving Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Other Ways to Give
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Bank Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Bank:</span> First National Bank</p>
                  <p><span className="font-semibold">Account:</span> PGMI Church</p>
                  <p><span className="font-semibold">Routing:</span> 123456789</p>
                  <p><span className="font-semibold">Account #:</span> 987654321</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href="/contact">Contact for Details</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Check/Money Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Mail your check or money order to our church office.
                  Please include your name and donation type in the memo.
                </p>
                <div className="text-sm">
                  <p className="font-semibold">PGMI Church</p>
                  <p>123 Church Street</p>
                  <p>City, State 12345</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href="/contact">Get Address</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Planned Giving
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Consider including PGMI Church in your estate planning,
                  wills, or as a beneficiary of life insurance policies.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="/contact">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Financial Transparency
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe in transparency and accountability in how we use the resources
              entrusted to us. Your gifts are used wisely to further God 's kingdom.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Annual Reports</h3>
                <p className="text-muted-foreground">
                  Detailed financial reports available to all members
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accountability</h3>
                <p className="text-muted-foreground">
                  Independent audits and oversight by church leadership
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stewardship</h3>
                <p className="text-muted-foreground">
                  Careful management of all resources for maximum impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner with Us
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your generous giving enables us to continue our mission of spreading God 's love,
            serving our community, and reaching the world with the Gospel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/prayer">Submit Prayer Request</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
