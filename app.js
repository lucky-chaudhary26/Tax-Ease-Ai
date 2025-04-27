
// Constants
const INDIAN_TAX_BRACKETS = [
    { rate: 0.00, threshold: 0 },      // 0 - 3,00,000: 0%
    { rate: 0.05, threshold: 300000 }, // 3,00,001 - 6,00,000: 5%
    { rate: 0.10, threshold: 600000 }, // 6,00,001 - 9,00,000: 10%
    { rate: 0.15, threshold: 900000 }, // 9,00,001 - 12,00,000: 15%
    { rate: 0.20, threshold: 1200000 }, // 12,00,001 - 15,00,000: 20%
    { rate: 0.30, threshold: 1500000 }  // Above 15,00,000: 30%
  ];
  
  // Indian State/UT Surcharge rates
  const STATE_SURCHARGE_RATES = {
    "Andhra Pradesh": 0.01,
    "Arunachal Pradesh": 0.01,
    "Assam": 0.01,
    "Bihar": 0.01,
    "Chhattisgarh": 0.01,
    "Goa": 0.01,
    "Gujarat": 0.009,
    "Haryana": 0.01,
    "Himachal Pradesh": 0.01,
    "Jharkhand": 0.01,
    "Karnataka": 0.01,
    "Kerala": 0.01,
    "Madhya Pradesh": 0.01,
    "Maharashtra": 0.015,
    "Manipur": 0.01,
    "Meghalaya": 0.01,
    "Mizoram": 0.01,
    "Nagaland": 0.01,
    "Odisha": 0.01,
    "Punjab": 0.008,
    "Rajasthan": 0.01,
    "Sikkim": 0.01,
    "Tamil Nadu": 0.012,
    "Telangana": 0.011,
    "Tripura": 0.01,
    "Uttar Pradesh": 0.008,
    "Uttarakhand": 0.01,
    "West Bengal": 0.01,
    
    // Union Territories
    "Andaman and Nicobar Islands": 0.01,
    "Chandigarh": 0.01,
    "Dadra and Nagar Haveli and Daman and Diu": 0.01,
    "Lakshadweep": 0.01,
    "Delhi": 0.01,
    "Puducherry": 0.01,
    "Ladakh": 0.01,
    "Jammu and Kashmir": 0.01
  };
  
  
  // Tax News Data
  const taxNews = [
    {
      id: 1,
      title: "New Tax Credits for Clean Energy Investments",
      summary: "The IRS has announced expanded tax credits for homeowners investing in clean energy solutions like solar panels and electric vehicles.",
      date: "April 1, 2025",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80"
    },
    {
      id: 2,
      title: "Tax Filing Deadline Extended for Natural Disaster Areas",
      summary: "The IRS has extended tax filing deadlines by 60 days for residents affected by recent natural disasters in several states.",
      date: "March 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      id: 3,
      title: "Small Business Tax Deductions Increased for 2025",
      summary: "Small business owners can now deduct up to $1.2 million in qualifying equipment purchases, an increase from last year's limit.",
      date: "March 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
    },
    {
      id: 4,
      title: "New Digital Assets Reporting Requirements",
      summary: "The Treasury Department has finalized new rules requiring broader reporting of cryptocurrency and digital asset transactions.",
      date: "March 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
    }
  ];
  
  // DOM Elements - Tax Calculator
  const incomeSlider = document.getElementById('income-slider');
  const incomeInput = document.getElementById('income-input');
  const incomeDisplay = document.getElementById('income-display');
  const stateSelect = document.getElementById('state');
  const regimeSelect = document.getElementById('regime');
  const filingStatusSelect = document.getElementById('filing-status');
  const deductionsInput = document.getElementById('deductions');
  const incomeTaxDisplay = document.getElementById('income-tax');
  const stateSurchargeDisplay = document.getElementById('state-surcharge');
  const afterTaxIncomeDisplay = document.getElementById('after-tax-income');
  const effectiveTaxRateDisplay = document.getElementById('effective-tax-rate');
  
  // DOM Elements - Slideshow
  const slidesContainer = document.querySelector('.slides');
  const indicatorsContainer = document.querySelector('.slide-indicators');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  
  // DOM Elements - Other
  const currentYearElement = document.getElementById('current-year');
  
  // Initialize Tax Calculator
  function initTaxCalculator() {
    // Set up event listeners
    incomeSlider.addEventListener('input', handleIncomeSliderChange);
    incomeInput.addEventListener('input', handleIncomeInputChange);
    stateSelect.addEventListener('change', calculateTax);
    regimeSelect.addEventListener('change', calculateTax);
    filingStatusSelect.addEventListener('change', calculateTax);
    deductionsInput.addEventListener('input', calculateTax);
  
    // Calculate initial tax values
    calculateTax();
  }
  
  // Handle income slider change
  function handleIncomeSliderChange() {
    const value = incomeSlider.value;
    incomeInput.value = value;
    incomeDisplay.textContent = formatCurrency(Number(value)).replace('₹', '');
    calculateTax();
  }
  
  // Handle income input change
  function handleIncomeInputChange() {
    const value = Number(incomeInput.value);
    incomeSlider.value = value;
    incomeDisplay.textContent = formatCurrency(value).replace('₹', '');
    calculateTax();
  }
  
  // Calculate tax
  function calculateTax() {
    const income = Number(incomeInput.value);
    const state = stateSelect.value;
    const deductions = Number(deductionsInput.value);
    
    // Adjust income with deductions
    const taxableIncome = Math.max(0, income - deductions);
    
    // Calculate income tax based on tax brackets
    let tax = 0;
    
    for (let i = 0; i < INDIAN_TAX_BRACKETS.length; i++) {
      const { rate, threshold } = INDIAN_TAX_BRACKETS[i];
      const nextThreshold = i < INDIAN_TAX_BRACKETS.length - 1 ? INDIAN_TAX_BRACKETS[i+1].threshold : Infinity;
      
      if (taxableIncome > threshold) {
        const taxableAmount = Math.min(taxableIncome - threshold, nextThreshold - threshold);
        tax += taxableAmount * rate;
      }
      
      if (taxableIncome <= nextThreshold) break;
    }
    
    // Add cess (4% Health & Education Cess)
    tax = tax * 1.04;
    
    // Calculate state surcharge
    const surchargeRate = STATE_SURCHARGE_RATES[state] || 0;
    const surchargeAmount = tax * surchargeRate;
    
    // Calculate after-tax income
    const totalTax = tax + surchargeAmount;
    const afterTaxAmount = income - totalTax;
    const effectiveRate = (totalTax / income) * 100;
    
    // Update the UI
    incomeTaxDisplay.textContent = formatCurrency(Math.round(tax)).replace('₹', '');
    stateSurchargeDisplay.textContent = formatCurrency(Math.round(surchargeAmount)).replace('₹', '');
    afterTaxIncomeDisplay.textContent = formatCurrency(Math.round(afterTaxAmount)).replace('₹', '');
    effectiveTaxRateDisplay.textContent = (Math.round(effectiveRate * 100) / 100).toFixed(2);
  }
  
  // Format currency in Indian Rupees
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  // Initialize Slideshow
  function initSlideshow() {
    let currentSlide = 0;
    let autoplayTimer = null;
    let isAutoplay = true;
  
    // Create slides
    taxNews.forEach((news, index) => {
      const slide = document.createElement('div');
      slide.className = `slide ${index === 0 ? 'active' : ''}`;
      slide.innerHTML = `
        <div class="slide-image-container">
          <img src="${news.imageUrl}" alt="${news.title}" class="slide-image">
          <div class="image-overlay"></div>
          <div class="slide-info">
            <p class="slide-date">${news.date}</p>
            <h3 class="slide-title">${news.title}</h3>
          </div>
        </div>
        <div class="slide-content">
          <p class="slide-summary">${news.summary}</p>
        </div>
      `;
      slidesContainer.appendChild(slide);
  
      // Create indicators
      const indicator = document.createElement('button');
      indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
      indicator.addEventListener('click', () => {
        goToSlide(index);
        stopAutoplay();
      });
      indicatorsContainer.appendChild(indicator);
    });
  
    // Set up event listeners
    prevButton.addEventListener('click', () => {
      goToPrevSlide();
      stopAutoplay();
    });
    
    nextButton.addEventListener('click', () => {
      goToNextSlide();
      stopAutoplay();
    });
  
    // Start autoplay
    startAutoplay();
  
    // Slide navigation functions
    function goToSlide(index) {
      const slides = document.querySelectorAll('.slide');
      const indicators = document.querySelectorAll('.indicator');
      
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide].classList.remove('active');
      
      currentSlide = index;
      
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }
  
    function goToNextSlide() {
      const nextIndex = (currentSlide + 1) % taxNews.length;
      goToSlide(nextIndex);
    }
  
    function goToPrevSlide() {
      const prevIndex = (currentSlide - 1 + taxNews.length) % taxNews.length;
      goToSlide(prevIndex);
    }
  
    function startAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      isAutoplay = true;
      autoplayTimer = setInterval(goToNextSlide, 5000);
    }
  
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      isAutoplay = false;
    }
  }
  
  // Initialize current year in footer
  function initCurrentYear() {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    initTaxCalculator();
    initSlideshow();
    initCurrentYear();
  });