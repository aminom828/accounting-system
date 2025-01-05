// ثبت فاکتور
document.getElementById('invoice-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const customerName = document.getElementById('customer-name').value;
    const invoiceAmount = document.getElementById('invoice-amount').value;
    const invoiceDate = document.getElementById('invoice-date').value;
    
    // ذخیره داده‌ها در localStorage
    const invoice = {
        customerName,
        invoiceAmount,
        invoiceDate
    };
    saveData('invoices', invoice);
    alert('فاکتور با موفقیت ثبت شد!');
});

// ثبت هزینه
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const expenseDescription = document.getElementById('expense-description').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseDate = document.getElementById('expense-date').value;
    
    // ذخیره داده‌ها در localStorage
    const expense = {
        expenseDescription,
        expenseAmount,
        expenseDate
    };
    saveData('expenses', expense);
    alert('هزینه با موفقیت ثبت شد!');
});

// ثبت کالا
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productQuantity = document.getElementById('product-quantity').value;
    const productPrice = document.getElementById('product-price').value;
    
    // ذخیره داده‌ها در localStorage
    const product = {
        productName,
        productQuantity,
        productPrice
    };
    saveData('products', product);
    alert('کالا با موفقیت ثبت شد!');
});

// تابع ذخیره داده‌ها
function saveData(key, data) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(data);
    localStorage.setItem(key, JSON.stringify(items));
}

// تولید گزارش
document.getElementById('generate-report').addEventListener('click', function() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    let totalIncome = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.invoiceAmount), 0);
    let totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.expenseAmount), 0);
    let totalProductsValue = products.reduce((sum, product) => sum + (parseFloat(product.productQuantity) * parseFloat(product.productPrice)), 0);
    let profit = totalIncome - totalExpenses;
    
    const reportResult = document.getElementById('report-result');
    reportResult.innerHTML = `
        <p>کل درآمد: ${totalIncome.toLocaleString()} تومان</p>
        <p>کل هزینه‌ها: ${totalExpenses.toLocaleString()} تومان</p>
        <p>ارزش کل کالاها: ${totalProductsValue.toLocaleString()} تومان</p>
        <p>سود/زیان: ${profit.toLocaleString()} تومان</p>
    `;
});