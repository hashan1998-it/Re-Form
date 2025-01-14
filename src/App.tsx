import FormWizard from './components/FormWizard/FormWizard';

const App = () => {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Final Form Data:', data);
  };

  return (
    <FormWizard
      onSubmit={handleSubmit}
      buttonGap={2}
    >
      <div>
        <h2>Step 1</h2>
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
      </div>
      <div>
        <h2>Step 2</h2>
        <input name="email" type="email" placeholder="Email Address" />
      </div>
    </FormWizard>


  );
};

export default App;
