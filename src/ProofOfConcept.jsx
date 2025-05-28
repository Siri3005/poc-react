import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProofTable from './ProofTable';

function ProofOfConceptPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
        
        <ProofTable />
      </main>
      <Footer />
    </div>
  );
}

export default ProofOfConceptPage;
