import { Metadata } from 'next';
import { Navbar } from '@/components/ui/navbar';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';

export const metadata: Metadata = {
  title: 'Design Partner Pilot Program | Pearly',
  description: 'Apply for the Pearly 2026 Design Partner Pilot Program. 1-4 chair dental clinics only.',
};

export default function PilotPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-burgundy/10 text-burgundy text-xs font-bold uppercase tracking-widest mb-4 rounded-full">
              Q2 2026 Pilot Program
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-burgundy mb-6 leading-tight">
              Shape the Future of <br /> Independent Dentistry.
            </h1>
            <p className="text-xl text-navy/80 font-light italic max-w-2xl mx-auto leading-relaxed">
              We are selecting 5 boutique practices to join our Design Partner Program. 
              Get full access to Pearly for 90 days, waived implementation, and direct 
              influence on our 2026 compliance roadmap.
            </p>
          </div>

          {/* Visual Asset */}
          <div className="mb-20 rounded-custom overflow-hidden paper-shadow border-[12px] border-white/50">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffce47267a5?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional dental office administration" 
              className="w-full h-[500px] object-cover grayscale-[0.2] sepia-[0.1]"
            />
          </div>

          {/* Intake Form */}
          <div className="bg-navy p-8 md:p-20 rounded-custom text-cream paper-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-burgundy opacity-60"></div>
            
            <div className="mb-12 border-b border-cream/10 pb-10">
              <h2 className="text-3xl font-serif font-bold mb-4">Pilot Application</h2>
              <p className="opacity-70 text-sm tracking-wide uppercase font-bold">1-4 Chair Practices Only</p>
            </div>
            
            <form id="pilot-form" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormInput 
                  label="Practice Name" 
                  name="practiceName" 
                  required 
                  placeholder="e.g. Oak Ridge Dental" 
                />
                <FormInput 
                  label="Office Manager / Lead Contact" 
                  name="contactName" 
                  required 
                  placeholder="e.g. Sarah Jenkins" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FormInput 
                  label="Practice Email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="hello@practice.com" 
                />
                <FormSelect 
                  label="Number of Chairs" 
                  name="chairs" 
                  options={[
                    { value: '1', label: '1 Chair' },
                    { value: '2', label: '2 Chairs' },
                    { value: '3', label: '3 Chairs' },
                    { value: '4', label: '4 Chairs' }
                  ]} 
                />
              </div>

              <FormInput 
                label="Current Management Software" 
                name="software" 
                required
                placeholder="Dentrix, Eaglesoft, Open Dental, etc." 
              />

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold opacity-70">
                  Primary Administrative Pain Point
                </label>
                <textarea 
                  name="painPoints"
                  required
                  rows={4}
                  placeholder="e.g. Chasing pre-auths for crowns, or the front desk is overwhelmed with phone tag..."
                  className="w-full bg-cream/10 border border-cream/20 rounded-custom p-5 text-cream focus:outline-none focus:border-burgundy transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-burgundy hover:bg-cream hover:text-burgundy text-cream py-6 font-bold uppercase tracking-[0.3em] transition-all rounded-custom paper-shadow text-sm"
              >
                Submit Pilot Application
              </button>
              
              <p id="pilot-status" className="mt-6 text-center text-sm font-bold uppercase tracking-widest hidden"></p>
            </form>
          </div>

          {/* Program Benefits */}
          <div className="mt-32 grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-burgundy font-serif font-bold text-xl mb-4">Zero Cost</h3>
              <p className="text-navy/70 text-sm leading-relaxed">Full platform access waived for 90 days. No implementation fees.</p>
            </div>
            <div>
              <h3 className="text-burgundy font-serif font-bold text-xl mb-4">Direct Influence</h3>
              <p className="text-navy/70 text-sm leading-relaxed">Weekly 1-on-1 sessions with our product team to shape our roadmap.</p>
            </div>
            <div>
              <h3 className="text-burgundy font-serif font-bold text-xl mb-4">Priority Support</h3>
              <p className="text-navy/70 text-sm leading-relaxed">Dedicated implementation shepherd for your office manager.</p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />

      <script dangerouslySetInnerHTML={{ __html: `
        const form = document.getElementById('pilot-form');
        const status = document.getElementById('pilot-status');
        
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          status.textContent = 'Submitting Application...';
          status.classList.remove('hidden', 'text-red-400');
          status.classList.add('text-cream');
          
          const formData = new FormData(form);
          const data = {
            practiceName: formData.get('practiceName'),
            contactName: formData.get('contactName'),
            email: formData.get('email'),
            chairs: formData.get('chairs'),
            software: formData.get('software'),
            painPoints: formData.get('painPoints'),
            source: 'pilot_program'
          };

          try {
            const response = await fetch('/api/pilot', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            if (response.ok) {
              status.textContent = 'Application Received. Our team will review and contact you within 48 hours.';
              form.reset();
            } else {
              throw new Error('Submission failed');
            }
          } catch (err) {
            status.textContent = 'Submission Error. Please email pilots@pearly.com directly.';
            status.classList.add('text-red-400');
          }
        });
      `}} />
    </main>
  );
}
