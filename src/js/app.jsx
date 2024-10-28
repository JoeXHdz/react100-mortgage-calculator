import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyPayment: null,
    };

    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleCalculation(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const principal = parseFloat(formData.get("balance"));
    const annualRate = parseFloat(formData.get("rate")) / 100; 
    const termYears = parseInt(formData.get("term"), 10); 

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears)) {
      this.setState({ monthlyPayment: '' });
      return;
    }
    // Monthly interest rate
    const monthlyRate = annualRate / 12; 
    // Total number of payments
    const totalPayments = termYears * 12; 

    // Monthly payment calculation
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    if (!isNaN(monthlyPayment) && monthlyPayment > 0) {
      this.setState({ monthlyPayment: monthlyPayment.toFixed(2) });
    } else {
      this.setState({ monthlyPayment: '' });
    }
  }

  render() {
    return (
      <main className='bg-dark m-auto p-5' style={{ height: "1svh" }}>
        <section className="container bg-dark p-4 shadow-lg rounded align-middle">
          <h3>Mortgage Calculator</h3>
          <form onSubmit={this.handleCalculation}>
            {/* Input for Mortgage Loan Balance */}
            <div className="form-group">
              <label htmlFor="balance">Mortgage Loan Balance in US dollars</label>
              <input className="form-control" name="balance" type="number" required step="0.01" />
            </div>
            {/* Input for Annual Percentage Rate */}
            <div className="form-group">
              <label htmlFor="rate">Annual Percentage Rate (APR)</label>
              <input className="form-control" name="rate" type="number" required step="0.01" />
            </div>
            {/* Select for Loan Term */}
            <div className="form-group">
              <label htmlFor="term">Loan Term in Years</label>
              <select className="form-control" name="term" required>
                <option value="">Select Term</option>
                <option value="15">15 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>
            {/* Submit Button */}
            <div className='row justify-content-end px-5'>
              <button className='btn btn-primary' type="submit" name="submit">Submit</button>
            </div>
          </form>
          {/* Output for Monthly Payment */}
          <div id="output" className="row h2 d-flex justify-content-center">
            {this.state.monthlyPayment !== null && (
              <p>Monthly Payment: ${this.state.monthlyPayment}</p>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default App;