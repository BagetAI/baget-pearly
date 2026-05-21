import { Metadata } from 'next';
import { Navbar } from '@/components/ui/navbar';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';

export const metadata: Metadata = {
  title: 'Pearly | The Automation Your Dental Practice Actually Uses',
  description: 'Vertical SaaS for independent dental practices. Automated pre-auth tracking, patient self-booking, and text-based recall.',
};

export default function Page() {
  return (
    <main>
      <Navbar />
      
      <Container>
        {/* Hero */}
        <section className="text-center py-20 md:py-32">
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-burgundy mb-8 leading-tight tracking-tight">
            The Automation Your Practice <br className="hidden md:block" /> Actually Uses.
          </h1>
          <p className="text-xl md:text-2xl text-navy/80 max-w-2xl mx-auto mb-16 leading-relaxed font-light italic">
            Stop chasing insurance approvals and start filling your chairs. 
            Zero hardware. Zero IT. Designed for the independent 1-4 chair clinic.
          </p>
          <div className="h-[2px] bg-burgundy w-32 mx-auto mb-16 opacity-30"></div>
          <a 
            href="#waitlist" 
            className="inline-block bg-burgundy text-cream px-14 py-6 font-bold uppercase tracking-[0.2em] hover:bg-navy transition-all transform hover:-translate-y-1 paper-shadow rounded-custom text-sm"
          >
            Request Beta Access
          </a>
        </section>

        {/* Hero Visual */}
        <div className="mb-32 relative rounded-custom overflow-hidden paper-shadow border-8 border-burgundy/5">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
            alt="Independent dental office environment" 
            className="w-full h-[600px] object-cover grayscale-[0.3] sepia-[0.1]"
          />
          <div className="absolute inset-0 bg-burgundy/5"></div>
        </div>

        {/* Features Grid */}
        <Section id="features" className="grid md:grid-cols-3 gap-20 mb-32">
          <Card 
            title="Automated Pre-Auth" 
            description='End "Portal Fatigue." We track every insurance request via FHIR APIs, giving you real-time status updates without a single manual login.' 
          />
          <Card 
            title="SMS Self-Booking" 
            description="Patients book, confirm, and reschedule via simple text. No apps, no portals, no friction. The Uber experience for your scheduling." 
          />
          <Card 
            title="Zero-IT Recall" 
            description="Automated text reactivation that turns forgotten recall lists into revenue. 1-click sync with Dentrix, Eaglesoft, and Open Dental." 
          />
        </Section>

        {/* Waitlist Form */}
        <section id="waitlist" className="bg-navy p-10 md:p-24 rounded-custom text-cream paper-shadow mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-burgundy opacity-50"></div>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Join the Pilot Group</h2>
              <p className="text-xl opacity-70 font-light max-w-lg mx-auto">
                We are selecting 10 independent clinics for our 2026 Founder's Batch. 
                Get Pearly free for 6 months and lock in a lifetime rate.
              </p>
            </div>
            
            <form id="waitlist-form" className="space-y-10">
              <FormInput 
                label="Practice Name" 
                name="practiceName" 
                required 
                placeholder="Heritage Dental Group" 
              />
              
              <div className="grid md:grid-cols-2 gap-10">
                <FormSelect 
                  label="Number of Chairs" 
                  name="chairs" 
                  options={[
                    { value: '1', label: '1 Chair' },
                    { value: '2', label: '2 Chairs' },
                    { value: '3', label: '3 Chairs' },
                    { value: '4', label: '4+ Chairs' }
                  ]} 
                />
                <FormInput 
                  label="Office Email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="office@practice.com" 
                />
              </div>

              <FormInput 
                label="Current Practice Management Software" 
                name="software" 
                placeholder="Dentrix, Eaglesoft, etc." 
              />

              <button 
                type="submit"
                className="w-full bg-burgundy hover:bg-cream hover:text-burgundy text-cream py-7 font-bold uppercase tracking-[0.3em] transition-all rounded-custom paper-shadow text-sm"
              >
                Apply for Beta Access
              </button>
              <p id="form-status" className="mt-8 text-center text-sm font-bold uppercase tracking-widest hidden"></p>
            </form>
          </div>
        </section>
      </Container>

      <Footer />

      <script dangerouslySetInnerHTML={{ __html: `
        const form = document.getElementById('waitlist-form');
        const status = document.getElementById('form-status');
        
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          status.textContent = 'Processing Application...';
          status.classList.remove('hidden', 'text-red-400');
          status.classList.add('text-cream');
          
          const formData = new FormData(form);
          const data = {
            practiceName: formData.get('practiceName'),
            chairs: formData.get('chairs'),
            email: formData.get('email'),
            software: formData.get('software')
          };

          try {
            const response = await fetch('https://app.baget.ai/api/public/databases/waitlist-signups/rows', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data })
            });

            if (response.ok) {
              status.textContent = 'Application Received. We will be in touch.';
              form.reset();
            } else {
              throw new Error();
            }
          } catch (err) {
            status.textContent = 'Connection Error. Please try again.';
            status.classList.add('text-red-400');
          }
        });
      `}} />
    </main>
  );
}
