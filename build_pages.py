"""
Generate all subpages for ASPIRE India website.
"""
import os

def get_header(active_page):
    about_active = 'is-active' if active_page in ['about', 'team', 'board', 'trust'] else ''
    what_active = 'is-active' if active_page in ['execution', 'programmes'] else ''
    partner_active = 'is-active' if active_page == 'partnerships' else ''
    resource_active = 'is-active' if active_page == 'resources' else ''
    
    return f'''  <!-- Site Header -->
  <header class="site-header" role="banner">
    <div class="container header-inner">
      <a href="../index.html" class="site-logo" aria-label="ASPIRE India Homepage">
        <img src="../images/logo.png" alt="ASPIRE India Logo" height="46">
      </a>

      <nav class="desktop-nav" aria-label="Main Navigation">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="../index.html" class="nav-link">Home</a>
          </li>

          <!-- About Us Dropdown -->
          <li class="nav-item">
            <button class="nav-link nav-dropdown-toggle {about_active}" aria-expanded="false" aria-haspopup="true">
              About Us
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="nav-dropdown-menu" aria-hidden="true">
              <a href="about.html" class="dropdown-link {'is-active' if active_page=='about' else ''}">
                Overview
                <span class="dropdown-desc">Identity, mission, vision &amp; beliefs</span>
              </a>
              <a href="team.html" class="dropdown-link {'is-active' if active_page=='team' else ''}">
                Our Team
                <span class="dropdown-desc">Leadership &amp; field professionals</span>
              </a>
              <a href="board-advisors.html" class="dropdown-link {'is-active' if active_page=='board' else ''}">
                Board &amp; Advisors
                <span class="dropdown-desc">Governance &amp; advisory council</span>
              </a>
              <a href="trust-accountability.html" class="dropdown-link {'is-active' if active_page=='trust' else ''}">
                Trust &amp; Accountability
                <span class="dropdown-desc">Reports, audits &amp; statutory disclosures</span>
              </a>
            </div>
          </li>

          <!-- What We Do Dropdown -->
          <li class="nav-item">
            <button class="nav-link nav-dropdown-toggle {what_active}" aria-expanded="false" aria-haspopup="true">
              What We Do
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="nav-dropdown-menu" aria-hidden="true">
              <a href="execution-model.html" class="dropdown-link {'is-active' if active_page=='execution' else ''}">
                Execution Model
                <span class="dropdown-desc">Ecosystem-wide change methodology</span>
              </a>
              <a href="programmes.html" class="dropdown-link {'is-active' if active_page=='programmes' else ''}">
                Core Programmes
                <span class="dropdown-desc">Flagship educational initiatives</span>
              </a>
            </div>
          </li>

          <li class="nav-item">
            <a href="partnerships.html" class="nav-link {partner_active}">Partnerships</a>
          </li>

          <li class="nav-item">
            <a href="resources.html" class="nav-link {resource_active}">Resources</a>
          </li>
        </ul>

        <a href="donate.html" class="btn btn-primary btn-sm donate-cta" data-track="header:donate_click">
          Donate Now
        </a>
      </nav>

      <button class="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>

  <div class="drawer-overlay" aria-hidden="true"></div>

  <div class="mobile-drawer" aria-hidden="true" role="dialog" aria-label="Mobile Navigation">
    <div class="drawer-header">
      <div class="site-logo">
        <img src="../images/logo.png" alt="ASPIRE Logo" height="40">
      </div>
      <button class="drawer-close-btn" aria-label="Close mobile menu">&times;</button>
    </div>

    <nav class="mobile-nav-list">
      <a href="../index.html" class="mobile-nav-link">Home</a>

      <div class="mobile-nav-item">
        <button class="mobile-nav-link accordion-toggle" aria-expanded="false">
          About Us
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion-menu" aria-hidden="true">
          <a href="about.html" class="mobile-nav-link">Overview</a>
          <a href="team.html" class="mobile-nav-link">Our Team</a>
          <a href="board-advisors.html" class="mobile-nav-link">Board &amp; Advisors</a>
          <a href="trust-accountability.html" class="mobile-nav-link">Trust &amp; Accountability</a>
        </div>
      </div>

      <div class="mobile-nav-item">
        <button class="mobile-nav-link accordion-toggle" aria-expanded="false">
          What We Do
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion-menu" aria-hidden="true">
          <a href="execution-model.html" class="mobile-nav-link">Execution Model</a>
          <a href="programmes.html" class="mobile-nav-link">Core Programmes</a>
        </div>
      </div>

      <a href="partnerships.html" class="mobile-nav-link">Partnerships</a>
      <a href="resources.html" class="mobile-nav-link">Resources</a>
    </nav>

    <div class="mobile-drawer-footer">
      <a href="donate.html" class="btn btn-primary btn-block donate-cta" style="width: 100%;">
        Donate Now
      </a>
      <p style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">
        80G Tax Exemption Eligible · Registered Society
      </p>
    </div>
  </div>'''

def get_footer():
    return '''  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="margin-bottom: var(--space-4);">
            <img src="../images/logo.png" alt="ASPIRE India Logo" height="48" style="background: #fff; padding: 4px 10px; border-radius: 8px;">
          </div>
          <p>
            ASPIRE (A Society for the Promotion of Inclusive and Relevant Education) is dedicated to ensuring quality education for every child in the most remote areas of India.
          </p>
          <div class="footer-credentials">
            <span class="cred-badge">Societies Reg. Act</span>
            <span class="cred-badge">FCRA Registered</span>
            <span class="cred-badge">80G Tax Exemption</span>
            <span class="cred-badge">12A Registered</span>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><a href="../index.html">Home</a></li>
            <li><a href="about.html">About ASPIRE</a></li>
            <li><a href="execution-model.html">Execution Model</a></li>
            <li><a href="programmes.html">Core Programmes</a></li>
            <li><a href="partnerships.html">Partnerships</a></li>
            <li><a href="resources.html">Reports &amp; Resources</a></li>
            <li><a href="donate.html">Donate Now</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Governance</h4>
          <ul class="footer-links">
            <li><a href="team.html">Our Team</a></li>
            <li><a href="board-advisors.html">Board &amp; Advisors</a></li>
            <li><a href="trust-accountability.html">Trust &amp; Transparency</a></li>
            <li><a href="trust-accountability.html#audits">Statutory Disclosures</a></li>
            <li><a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer">Official Reference Site &nearr;</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Contact Office</h4>
          <div class="footer-contact-item">
            <span>📍</span>
            <span>ASPIRE India National Office, New Delhi, India</span>
          </div>
          <div class="footer-contact-item">
            <span>✉️</span>
            <a href="mailto:info@aspire-india.org" style="color: #fff;">info@aspire-india.org</a>
          </div>
          <div class="footer-contact-item">
            <span>🌐</span>
            <span>aspire-india.org</span>
          </div>
          <div style="margin-top: var(--space-4);">
            <a href="donate.html" class="btn btn-primary btn-sm donate-cta">Make a Donation</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 ASPIRE — A Society for the Promotion of Inclusive and Relevant Education. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="trust-accountability.html">Privacy Policy</a>
          <a href="trust-accountability.html">Terms of Service</a>
          <a href="trust-accountability.html">80G Compliance</a>
        </div>
      </div>
    </div>
  </footer>

  <button class="back-to-top" aria-label="Back to top">&uarr;</button>
  <script src="../js/main.js" defer></script>'''

def build_execution_model():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Discover ASPIRE India's systemic execution model: how we work with children, teachers, schools, parents, SMCs, and Panchayats to transform education.">
  <title>Execution Model — How We Work Across the Education Ecosystem | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('execution')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span>What We Do</span>
          <span class="separator">/</span>
          <span class="current">Execution Model</span>
        </nav>
        <h1 class="page-title">Lasting change begins when the entire community moves together.</h1>
        <p class="page-lead">
          Improving education requires more than improving classrooms. It requires children to access school, teachers to be supported, and communities to participate in decisions that shape their schools.
        </p>
      </div>
    </header>

    <!-- Ecosystem Diagram -->
    <section class="section" aria-labelledby="ecosystem-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Systemic Architecture</span>
          <h2 id="ecosystem-heading" class="section-title">The Education Ecosystem Framework</h2>
          <p class="section-subtitle">
            How ASPIRE mobilises multiple stakeholders around the child to achieve sustainable educational outcomes.
          </p>
        </div>

        <div class="ecosystem-container reveal">
          <div class="ecosystem-diagram">
            <div class="ecosystem-node">
              <div class="ecosystem-node-icon" aria-hidden="true">🏡</div>
              <h4>Parents &amp; Community</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Village Education Committees, child labour tracking &amp; parent motivation.
              </p>
            </div>

            <div class="ecosystem-node node-center">
              <div class="ecosystem-node-icon" aria-hidden="true">👧🏽👦🏽</div>
              <h3 style="color: var(--brand-primary); font-size: 1.25rem;">THE CHILD</h3>
              <p style="font-size: 0.85rem; color: var(--brand-dark); font-weight: 500;">
                Universal Access &bull; Foundational Learning &bull; Secondary Transition
              </p>
            </div>

            <div class="ecosystem-node">
              <div class="ecosystem-node-icon" aria-hidden="true">👩🏽‍🏫</div>
              <h4>Teachers &amp; Schools</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                FLN pedagogy, activity-based learning &amp; joyful classroom environments.
              </p>
            </div>

            <div class="ecosystem-node">
              <div class="ecosystem-node-icon" aria-hidden="true">📋</div>
              <h4>School Management (SMCs)</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                School development plans, midday meal monitoring &amp; local accountability.
              </p>
            </div>

            <div class="ecosystem-node">
              <div class="ecosystem-node-icon" aria-hidden="true">🏛️</div>
              <h4>Panchayati Raj &amp; Local Govt.</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Child Labour Free Zone enforcement, Anganwadi convergence &amp; block review.
              </p>
            </div>

            <div class="ecosystem-node" style="border-color: var(--brand-secondary);">
              <div class="ecosystem-node-icon" aria-hidden="true">🇮🇳</div>
              <h4 style="color: var(--brand-secondary);">Public School System</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Institutional alignment with Samagra Shiksha, DIETs &amp; State Education.
              </p>
            </div>
          </div>
          <p style="text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: var(--space-6);">
            Conceptual Ecosystem Model: Sourced from ASPIRE official strategy and project implementation frameworks.
          </p>
        </div>
      </div>
    </section>

    <!-- 6 Detailed Steps -->
    <section class="section" style="background-color: var(--bg-surface);" aria-labelledby="steps-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">On-The-Ground Process</span>
          <h2 id="steps-heading" class="section-title">How We Implement On The Ground</h2>
          <p class="section-subtitle">
            Six rigorous, interconnected stages ensuring deep community ownership and measurable educational impact.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-8); max-width: 920px; margin: 0 auto;" class="reveal-stagger">
          <article id="understand" class="mv-card" style="scroll-margin-top: calc(var(--header-height) + 20px);">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: var(--brand-primary-light); color: var(--brand-primary);">Stage 01</span>
              <h3 style="font-size: 1.25rem;">Understanding Local Needs &amp; Baseline Mapping</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              Every intervention begins with an intensive household census and educational mapping. Rather than relying on generic statistical estimates, field teams work with village youth to create <strong>Village Education Registers (VER)</strong>.
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li>Identifying every out-of-school child (6–14 years) and adolescent at risk of dropout.</li>
              <li>Documenting root causes: seasonal migration, sibling care, agricultural labour, disability, or lack of transport.</li>
              <li>Assessing school infrastructure, teacher vacancies, and functional status of Anganwadis.</li>
            </ul>
          </article>

          <article id="access" class="mv-card" style="scroll-margin-top: calc(var(--header-height) + 20px);">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: #E0F2FE; color: #0369A1;">Stage 02 &bull; ACCESS</span>
              <h3 style="font-size: 1.25rem;">Reclaiming Children &amp; Building Bridge Pathways</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              Bringing children back to school requires individualized care and academic bridge acceleration, especially for those who have spent years away from classrooms or engaged in manual labour.
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li><strong>Residential Bridge Course Centres (RBCs):</strong> Intensive catch-up courses in tribal belts like Saranda (Jharkhand) preparing adolescent girls for grade-appropriate entry into Class 6 or 8.</li>
              <li><strong>Non-Residential Learning Hubs:</strong> Localized remedial centers near seasonal brick kilns and migrant clusters.</li>
              <li><strong>Child Labour Free Zones (CLFZs):</strong> Mobilising Gram Panchayats to officially declare and enforce child-labour-free norms across 14,700+ habitations.</li>
            </ul>
            <div style="margin-top: var(--space-4); background: var(--bg-surface-green); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: 0.875rem; color: var(--brand-secondary); font-weight: 600;">
              Verified Metric: Over 80,000 out-of-school children reclaimed with a ~99% mainstreaming transition rate.
            </div>
          </article>

          <article id="learning" class="mv-card" style="scroll-margin-top: calc(var(--header-height) + 20px);">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: var(--brand-primary-light); color: var(--brand-primary);">Stage 03 &bull; LEARNING</span>
              <h3 style="font-size: 1.25rem;">Foundational Literacy, Numeracy &amp; Teacher Empowerment</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              Getting children into classrooms is only half the battle; ensuring they acquire meaningful literacy and mathematical competence is paramount.
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li><strong>Foundational Literacy &amp; Numeracy (FLN):</strong> Phonics-based, activity-rich modules in regional and tribal dialect bridging contexts.</li>
              <li><strong>Teacher Coaching:</strong> Continuous professional development for primary educators and Shishu Shiksha Kendra teachers in innovative, experiential pedagogies.</li>
              <li><strong>Community Education Resource Centres (CERCs):</strong> Digital learning hubs in remote villages equipped with computers, educational software, and library books.</li>
              <li><strong>Summer Learning Camps &amp; Suravi Talent Festivals:</strong> Academic camps to combat summer learning loss and celebrate student creativity.</li>
            </ul>
          </article>

          <article id="governance" class="mv-card" style="scroll-margin-top: calc(var(--header-height) + 20px);">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: var(--brand-secondary-light); color: var(--brand-secondary);">Stage 04 &bull; GOVERNANCE</span>
              <h3 style="font-size: 1.25rem;">Community Ownership &amp; Active School Management Committees</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              A public school thrives when the surrounding village takes active pride in its welfare. ASPIRE works extensively to build participatory governance.
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li>Training School Management Committee (SMC) parent members to formulate annual School Development Plans (SDP).</li>
              <li>Partnering with Gram Panchayats to allocate localized 15th Finance Commission funds for school water, sanitation, and safety.</li>
              <li>Empowering mothers and women's self-help groups (SHGs) to supervise midday meal hygiene and regular teacher attendance.</li>
            </ul>
          </article>

          <article class="mv-card">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: var(--brand-accent-light); color: var(--brand-accent);">Stage 05</span>
              <h3 style="font-size: 1.25rem;">Systemic Public Integration &amp; Policy Alignment</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              ASPIRE operates as a technical catalyst within the government apparatus, aligning with national frameworks such as Sarva Shiksha Abhiyan (SSA), Samagra Shiksha, and the National Education Policy (NEP).
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li>Joint block and district review meetings with District Collectors, DEOs, and Block Education Officers.</li>
              <li>Sharing pedagogical prototypes and teaching learning materials (TLMs) with District Institutes of Education and Training (DIETs).</li>
              <li>Collaborating with women and child development directorates to link Anganwadis directly with primary school feeding centers.</li>
            </ul>
          </article>

          <article class="mv-card">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="pillar-badge" style="background: #EDE9FE; color: #6D28D9;">Stage 06</span>
              <h3 style="font-size: 1.25rem;">Social Audits, Monitoring &amp; Independent Sustainability</h3>
            </div>
            <p style="margin-bottom: var(--space-3);">
              Our ultimate objective is self-reliance. As habitations achieve sustained zero child-labour status, ASPIRE gradually transitions ongoing tracking entirely to empowered Gram Panchayats and SMCs.
            </p>
            <ul style="padding-left: var(--space-5); list-style: disc; color: var(--text-secondary); font-size: 0.95rem;">
              <li>Periodic community social audits where children, parents, and teachers review learning progress publicly.</li>
              <li>Transition of Community Education Resource Centres to youth-managed local cooperatives.</li>
              <li>Rigorous third-party evaluations and annual reporting to ensure ongoing institutional fidelity.</li>
            </ul>
          </article>
        </div>

        <div style="text-align: center; margin-top: var(--space-12);" class="reveal">
          <div class="btn-group" style="justify-content: center;">
            <a href="programmes.html" class="btn btn-primary btn-lg">
              Explore Core Programmes
            </a>
            <a href="partnerships.html" class="btn btn-outline btn-lg">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/execution-model.html', 'w') as f:
        f.write(content)
    print('pages/execution-model.html written:', len(content), 'bytes')

build_execution_model()

# =========================================================================
# 3. CORE PROGRAMMES (pages/programmes.html)
# =========================================================================
def build_programmes():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Explore ASPIRE India's core education programmes: Education Signature Program, Bridge Courses, Learning Enhancement, CERCs, and Early Childhood Development.">
  <title>Core Programmes — ASPIRE India Educational Initiatives</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('programmes')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span>What We Do</span>
          <span class="separator">/</span>
          <span class="current">Core Programmes</span>
        </nav>
        <h1 class="page-title">Turning educational possibilities into action.</h1>
        <p class="page-lead">
          Across diverse geographical and social terrains, our signature programmes work in synergy to secure universal access, accelerate foundational learning, and embed community accountability.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="programmes-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Programmatic Portfolio</span>
          <h2 id="programmes-heading" class="section-title">Verified Grassroots Initiatives</h2>
          <p class="section-subtitle">
            Ground-tested interventions across 5 states, operating in direct partnership with state education departments.
          </p>
        </div>

        <div class="programmes-grid reveal-stagger">
          <!-- Prog 1 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: var(--brand-primary-light); color: var(--brand-primary);">Signature Model</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active &bull; Multi-State</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Education Signature Program (ESP)</h3>
            <div class="programme-meta">
              <span>📍 Odisha (Keonjhar, Sundargarh, Jajpur)</span>
              <span>🎯 1.2M+ Learners</span>
            </div>
            <p class="pillar-desc">
              ASPIRE’s comprehensive flagship saturation initiative integrating access, pedagogy, and community governance. Deployed across entire mining and tribal blocks to eradicate child labour and ensure 100% completion of secondary education.
            </p>
            <div class="programme-outcomes">
              Key Outcome: 6,400+ government schools revitalised and thousands of habitations certified Child Labour Free.
            </div>
          </article>

          <!-- Prog 2 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: #E0F2FE; color: #0369A1;">Access Pillar</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Residential &amp; Non-Residential Bridge Courses</h3>
            <div class="programme-meta">
              <span>📍 Jharkhand &amp; Odisha</span>
              <span>🎯 Out-of-School Children</span>
            </div>
            <p class="pillar-desc">
              Specialized catch-up institutions—such as the Saranda Girls’ Residential Bridge Course in Jharkhand’s deep forest belt—providing holistic residential care, foundational literacy, numeracy, and life-skills training to mainstream dropouts.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Over 80,000 out-of-school children mainstreamed with an exceptional ~99% retention transition rate.
            </div>
          </article>

          <!-- Prog 3 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: var(--brand-primary-light); color: var(--brand-primary);">Learning Pillar</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Learning Enhancement Programme (LEP)</h3>
            <div class="programme-meta">
              <span>📍 Primary Schools Across 5 States</span>
              <span>🎯 Grades 1 to 5</span>
            </div>
            <p class="pillar-desc">
              Targeted curricular interventions to guarantee Foundational Literacy &amp; Numeracy (FLN). Features child-centric teaching-learning materials (TLMs), bilingual tribal dialect transition readers, and peer-learning math toolkits.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Marked escalation in reading fluency and basic arithmetic comprehension verified via periodic assessments.
            </div>
          </article>

          <!-- Prog 4 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: #EDE9FE; color: #6D28D9;">Digital &amp; Community</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Community Education Resource Centres (CERCs)</h3>
            <div class="programme-meta">
              <span>📍 Odisha &amp; Jharkhand Villages</span>
              <span>🎯 Children, Youth &amp; Community</span>
            </div>
            <p class="pillar-desc">
              Solar-powered digital learning sanctuaries established inside remote villages. Equipped with multimedia learning tablets, curated library shelves, and internet connectivity, serving as homework hubs and youth digital skill gateways.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Bridges the digital divide for first-generation learners and delivers vital village e-governance services.
            </div>
          </article>

          <!-- Prog 5 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: var(--brand-accent-light); color: var(--brand-accent);">Capacity Building</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Teacher Professional Development &amp; Pedagogy</h3>
            <div class="programme-meta">
              <span>📍 State &amp; District Institutes</span>
              <span>🎯 Primary &amp; Para-Teachers</span>
            </div>
            <p class="pillar-desc">
              Structured capacity-building workshops for government school educators, block resource persons (BRPs), and Shishu Shiksha Kendra teachers focusing on joyful experiential science, story-based language, and multigrade teaching.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Thousands of rural teachers coached into empathetic mentors, fostering fear-free school environments.
            </div>
          </article>

          <!-- Prog 6 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: var(--brand-secondary-light); color: var(--brand-secondary);">Governance Pillar</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Jan Pahal Community Mobilization</h3>
            <div class="programme-meta">
              <span>📍 Chhattisgarh</span>
              <span>🎯 Gram Panchayats &amp; SMCs</span>
            </div>
            <p class="pillar-desc">
              Empowering grassroots democratic bodies to lead school revitalisation. Trains SMC parent members to formulate School Development Plans, monitor midday meals, and eradicate social discrimination in rural schools.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Widespread community-funded school infrastructure repairs and elevated attendance compliance.
            </div>
          </article>

          <!-- Prog 7 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: #FEF3C7; color: #B45309;">Urban Focus</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Delhi Urban Education Project</h3>
            <div class="programme-meta">
              <span>📍 Resettlement &amp; Slum Clusters, Delhi</span>
              <span>🎯 Migrant Children</span>
            </div>
            <p class="pillar-desc">
              Addressing the acute vulnerabilities of children of interstate seasonal migrant labourers, construction workers, and ragpickers. Coordinates with Municipal Corporation of Delhi (MCD) schools to ensure admissions and learning support.
            </p>
            <div class="programme-outcomes">
              Key Outcome: Prevents irreversible urban school dropouts caused by family relocations and street hazards.
            </div>
          </article>

          <!-- Prog 8 -->
          <article class="programme-card">
            <div class="programme-badges">
              <span class="pillar-badge" style="background: #FCE7F3; color: #BE185D;">Early Years</span>
              <span class="pillar-badge" style="background: #DCFCE7; color: #15803D;">Active</span>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Early Childhood Development &amp; Anganwadi Support</h3>
            <div class="programme-meta">
              <span>📍 7,125 Anganwadi Centres</span>
              <span>🎯 Toddlers (Ages 3 to 6)</span>
            </div>
            <p class="pillar-desc">
              Transforming Anganwadis into joyful early-learning spaces. Equips Anganwadi workers with sensory play kits, preschool readiness modules, and connects health/nutrition tracking directly with primary school feeding rosters.
            </p>
            <div class="programme-outcomes">
              Key Outcome: 7,125 Anganwadis upgraded, ensuring seamless cognitive readiness for primary Class 1 admissions.
            </div>
          </article>
        </div>

        <div style="text-align: center; margin-top: var(--space-12);" class="reveal">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: var(--space-4);">
            All programme names, areas, and outcomes are sourced from verified ASPIRE reports and official web disclosures at aspire-india.org.
          </p>
          <a href="partnerships.html" class="btn btn-primary btn-lg">
            Collaborate on a Programme
          </a>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/programmes.html', 'w') as f:
        f.write(content)
    print('pages/programmes.html written:', len(content), 'bytes')

build_programmes()

# =========================================================================
# 4. DONATE PAGE (pages/donate.html)
# =========================================================================
def build_donate():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Support education for children in India. Donate to ASPIRE India to help strengthen government schools, train teachers, and reclaim out-of-school children. Eligible for 80G tax exemption.">
  <title>Donate Now — Open Doors to Education | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('donate')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span class="current">Donate</span>
        </nav>
        <h1 class="page-title">Your support can help open doors to education.</h1>
        <p class="page-lead">
          Every child deserves the opportunity to learn, grow and build a better future. Your contribution supports the work of strengthening schools, empowering teachers, and helping communities make quality education possible.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="donation-heading">
      <div class="container">
        <div class="donation-layout">
          <!-- Left Col: Donation Form & States -->
          <div class="donation-form-container reveal">
            <h2 id="donation-heading" style="font-size: 1.5rem; margin-bottom: var(--space-2);">Choose Your Contribution</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: var(--space-6);">
              All donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.
            </p>

            <form id="donation-form" novalidate>
              <!-- Step 1: Amount Selection -->
              <div class="form-step">
                <label class="form-label" style="margin-bottom: var(--space-3); display: block;">Select Amount (INR / ₹)</label>
                <div class="amount-presets-grid" role="group" aria-label="Donation amount presets">
                  <button type="button" class="amount-preset-btn" data-amount="500">₹500</button>
                  <button type="button" class="amount-preset-btn is-selected" data-amount="1000">₹1,000</button>
                  <button type="button" class="amount-preset-btn" data-amount="2500">₹2,500</button>
                  <button type="button" class="amount-preset-btn" data-amount="5000">₹5,000</button>
                </div>

                <!-- Custom Amount -->
                <div class="custom-amount-wrap">
                  <label for="custom-amount" class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Or enter custom amount:</label>
                  <div class="input-with-symbol">
                    <span class="currency-symbol" aria-hidden="true">₹</span>
                    <input type="number" id="custom-amount" class="form-input" min="100" max="1000000" step="50" placeholder="e.g. 1500" aria-label="Custom donation amount in Rupees">
                  </div>
                  <div class="amount-error field-error" aria-live="polite"></div>
                </div>

                <!-- Selected Amount Banner -->
                <div class="selected-amount-banner">
                  <span style="font-size: 0.875rem; font-weight: 500; color: var(--text-secondary);">Total Contribution:</span>
                  <span class="selected-amount-display">₹1,000</span>
                </div>
              </div>

              <!-- Step 2: Donor Details -->
              <div class="form-step">
                <h3 style="font-size: 1.125rem; margin-bottom: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--border-light);">
                  Donor Information
                </h3>

                <div class="form-field">
                  <label for="donor-name" class="form-label">Full Name <span style="color: var(--color-error);">*</span></label>
                  <input type="text" id="donor-name" class="form-input" placeholder="e.g. Ananya Sharma" required autocomplete="name">
                  <div class="field-error" aria-live="polite"></div>
                </div>

                <div class="form-field">
                  <label for="donor-email" class="form-label">Email Address <span style="color: var(--color-error);">*</span></label>
                  <input type="email" id="donor-email" class="form-input" placeholder="name@example.com" required autocomplete="email">
                  <span class="field-help">Your 80G tax receipt will be delivered to this email.</span>
                  <div class="field-error" aria-live="polite"></div>
                </div>

                <div class="form-field">
                  <label for="donor-phone" class="form-label">Mobile Number</label>
                  <input type="tel" id="donor-phone" class="form-input" placeholder="10-digit mobile number" autocomplete="tel">
                  <div class="field-error" aria-live="polite"></div>
                </div>

                <div class="form-field">
                  <label for="donor-pan" class="form-label">PAN Card Number (Optional)</label>
                  <input type="text" id="donor-pan" class="form-input" placeholder="e.g. ABCDE1234F" maxlength="10" style="text-transform: uppercase;">
                  <span class="field-help">Required by the Income Tax Department to issue an 80G tax exemption certificate.</span>
                  <div class="field-error" aria-live="polite"></div>
                </div>

                <div class="form-field" style="margin-top: var(--space-4);">
                  <label style="display: flex; gap: var(--space-2); align-items: flex-start; cursor: pointer; font-size: 0.8rem; color: var(--text-secondary);">
                    <input type="checkbox" id="donor-consent" required style="margin-top: 3px;">
                    <span>I confirm that I am an Indian citizen donating from personal funds, and agree to ASPIRE India's privacy policy.</span>
                  </label>
                  <div class="field-error" aria-live="polite"></div>
                </div>

                <button type="submit" class="btn btn-primary btn-lg donate-submit-btn" style="width: 100%; margin-top: var(--space-4);" data-track="donation:submit">
                  Proceed to Secure Payment &bull; ₹1,000
                </button>
              </div>

              <!-- Payment Processing State -->
              <div class="donation-processing" aria-live="assertive">
                <div style="font-size: 2.5rem; margin-bottom: var(--space-2); animation: spin 1s infinite linear;">⏳</div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">We’re securely processing your contribution...</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary);">
                  Please do not refresh or close this browser window. Verifying payment transaction.
                </p>
              </div>

              <!-- Payment Success State -->
              <div class="donation-success" aria-live="polite">
                <div style="font-size: 3rem; margin-bottom: var(--space-2);">🎉</div>
                <h3 style="color: var(--color-success); font-size: 1.5rem; margin-bottom: 0.5rem;">
                  Thank you for standing with education.
                </h3>
                <p style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: var(--space-4);">
                  Your contribution supports the work of creating better learning opportunities for children. Together, we can help build a future where every child gets the chance to learn and grow.
                </p>
                <div style="background: #fff; padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--color-success); margin-bottom: var(--space-6); text-align: left; font-size: 0.85rem;">
                  <div><strong>Confirmed Amount:</strong> <span class="success-amount">₹1,000</span></div>
                  <div><strong>Transaction Reference:</strong> <span class="success-ref">ASP-2024-XXXX</span></div>
                  <div><strong>80G Receipt:</strong> Dispatched to your registered email address within 24 hours.</div>
                </div>
                <a href="../index.html" class="btn btn-primary">Return to Homepage</a>
              </div>

              <!-- Payment Error State -->
              <div class="donation-error" aria-live="assertive">
                <div style="font-size: 3rem; margin-bottom: var(--space-2);">⚠️</div>
                <h3 style="color: var(--color-error); font-size: 1.25rem; margin-bottom: 0.5rem;">
                  Your payment could not be completed.
                </h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
                  Don't worry — no funds were deducted. You can try again or complete your contribution via our official gateway.
                </p>
                <div class="btn-group" style="justify-content: center;">
                  <button type="button" class="btn btn-primary donation-retry-btn">Try Again</button>
                  <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Official Portal &nearr;</a>
                </div>
              </div>

              <!-- Prototype Notice -->
              <div class="prototype-disclaimer">
                <strong>ℹ️ PROTOTYPE NOTE:</strong> This is an interactive MVP demonstration flow. For real financial contributions, please visit the official ASPIRE India portal at <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 600;">aspire-india.org</a> or contact finance@aspire-india.org. No actual monetary charge is made in this demonstration.
              </div>
            </form>
          </div>

          <!-- Right Col: Trust & Transparency Information -->
          <div class="reveal">
            <!-- Trust Panel -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: var(--space-6); margin-bottom: var(--space-6);">
              <h3 style="font-size: 1.125rem; margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
                <span aria-hidden="true">🛡️</span> Your Contribution Is In Safe Hands
              </h3>
              <ul style="display: flex; flex-direction: column; gap: var(--space-3); font-size: 0.875rem; color: var(--text-secondary);">
                <li style="display: flex; gap: var(--space-2);">
                  <span style="color: var(--color-success); font-weight: bold;">✓</span>
                  <span><strong>50% Tax Exemption:</strong> All donations are covered under Section 80G of the Indian IT Act.</span>
                </li>
                <li style="display: flex; gap: var(--space-2);">
                  <span style="color: var(--color-success); font-weight: bold;">✓</span>
                  <span><strong>Statutory Audits:</strong> Independent chartered accounting audits conducted annually.</span>
                </li>
                <li style="display: flex; gap: var(--space-2);">
                  <span style="color: var(--color-success); font-weight: bold;">✓</span>
                  <span><strong>FCRA Registered:</strong> Fully authorized by the Ministry of Home Affairs to receive developmental grants.</span>
                </li>
                <li style="display: flex; gap: var(--space-2);">
                  <span style="color: var(--color-success); font-weight: bold;">✓</span>
                  <span><strong>Direct Field Deployment:</strong> Maximum program allocation directly benefiting schools, children, and teachers.</span>
                </li>
              </ul>
            </div>

            <!-- FAQ Accordion -->
            <div>
              <h3 style="font-size: 1.125rem; margin-bottom: var(--space-4);">Frequently Asked Questions</h3>
              <div class="faq-accordion">
                <div class="faq-item">
                  <button class="faq-question" aria-expanded="false">
                    <span>How will my donation be utilized?</span>
                    <span>&plus;</span>
                  </button>
                  <div class="faq-answer">
                    Your contribution directly supports grassroots operations: establishing Community Education Resource Centres, supporting girls in Residential Bridge Courses, funding remedial learning materials, and mobilizing child-labour-free zones.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" aria-expanded="false">
                    <span>When do I receive my 80G Tax Receipt?</span>
                    <span>&plus;</span>
                  </button>
                  <div class="faq-answer">
                    A digital 80G certificate along with a formal donation receipt is emailed to your registered address within 24–48 hours of transaction confirmation.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" aria-expanded="false">
                    <span>Can international donors contribute?</span>
                    <span>&plus;</span>
                  </button>
                  <div class="faq-answer">
                    Yes, ASPIRE holds a valid FCRA registration for international support. Please write directly to info@aspire-india.org for foreign currency wire instructions.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" aria-expanded="false">
                    <span>Where can I inspect your audited accounts?</span>
                    <span>&plus;</span>
                  </button>
                  <div class="faq-answer">
                    We maintain absolute financial transparency. Visit our <a href="trust-accountability.html" style="color: var(--brand-primary); text-decoration: underline;">Trust &amp; Accountability</a> page to review past annual reports, balance sheets, and governance disclosures.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/donate.html', 'w') as f:
        f.write(content)
    print('pages/donate.html written:', len(content), 'bytes')

build_donate()

# =========================================================================
# 5. TRUST & ACCOUNTABILITY (pages/trust-accountability.html)
# =========================================================================
def build_trust():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ASPIRE India's commitment to transparency, financial integrity, statutory compliance (FCRA, 80G, 12A), independent audits, and annual reports.">
  <title>Trust &amp; Accountability — Governance &amp; Transparency | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('trust')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span>About Us</span>
          <span class="separator">/</span>
          <span class="current">Trust &amp; Accountability</span>
        </nav>
        <h1 class="page-title">Trust is built through transparency, accountability and action.</h1>
        <p class="page-lead">
          We believe that public trust is earned through uncompromising financial honesty, rigorous governance oversight, and open access to institutional data and evidence.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="creds-heading">
      <div class="container">
        <!-- Credential Badges -->
        <div class="section-header reveal">
          <span class="section-tag">Legal Identity</span>
          <h2 id="creds-heading" class="section-title">Statutory Registrations &amp; Compliance</h2>
          <p class="section-subtitle">
            Operating under strict regulatory compliance with the Government of India and relevant state authorities.
          </p>
        </div>

        <div class="pillars-grid reveal-stagger" style="margin-bottom: var(--space-12);">
          <div class="pillar-card">
            <div class="pillar-icon">📜</div>
            <h3 class="pillar-title">Societies Registration</h3>
            <p class="pillar-headline">Registered Non-Profit Society</p>
            <p class="pillar-desc">
              Registered under the Societies Registration Act XXI of 1860 as <em>Aspire – A Society for the Promotion of Inclusive and Relevant Education</em>.
            </p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">🏛️</div>
            <h3 class="pillar-title">Section 80G Approval</h3>
            <p class="pillar-headline">Income Tax Exemption</p>
            <p class="pillar-desc">
              Donations made to ASPIRE are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act, 1961.
            </p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">🌐</div>
            <h3 class="pillar-title">FCRA Registration</h3>
            <p class="pillar-headline">Foreign Contributions Regulation Act</p>
            <p class="pillar-desc">
              Fully compliant and renewed under the Ministry of Home Affairs to receive institutional grants and donations from international partners.
            </p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">📑</div>
            <h3 class="pillar-title">Section 12A Recognition</h3>
            <p class="pillar-headline">Charitable Trust Status</p>
            <p class="pillar-desc">
              Formally registered as a non-commercial charitable organisation dedicated solely to public education and child welfare.
            </p>
          </div>
        </div>

        <!-- Annual Reports & Audit Disclosures -->
        <div id="audits" class="section-header reveal" style="margin-top: var(--space-16);">
          <span class="section-tag">Public Records</span>
          <h2 class="section-title">Annual Reports &amp; Financial Disclosures</h2>
          <p class="section-subtitle">
            Download our verified annual impact reports, audited balance sheets, and program reviews.
          </p>
        </div>

        <div class="doc-list reveal-stagger" style="max-width: 860px; margin: 0 auto var(--space-12);">
          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">📄</div>
              <div>
                <h3 class="doc-title">ASPIRE Annual Report 2023–24</h3>
                <div class="doc-meta">Comprehensive program expansion, FLN outcomes &amp; audited financial statements &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              View Report &nearr;
            </a>
          </div>

          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">📄</div>
              <div>
                <h3 class="doc-title">ASPIRE Annual Report 2022–23</h3>
                <div class="doc-meta">Post-pandemic learning recovery, CERC rollouts &amp; statutory audit disclosure &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              View Report &nearr;
            </a>
          </div>

          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">📄</div>
              <div>
                <h3 class="doc-title">ASPIRE Annual Report 2021–22</h3>
                <div class="doc-meta">Community education resilience, child protection &amp; financial review &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              View Report &nearr;
            </a>
          </div>
        </div>

        <!-- Governance Oversight Notice -->
        <div class="container-narrow reveal" style="background: var(--bg-surface-warm); border: 1px solid var(--brand-accent); border-radius: var(--radius-xl); padding: var(--space-6); text-align: center;">
          <h3 style="color: var(--color-warning); font-size: 1.125rem; margin-bottom: 0.5rem;">Independent Governance &amp; Ethics</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: var(--line-height-relaxed);">
            ASPIRE is governed by an eminent Board of Educationists chaired by <strong>Dr. N.V. Varghese</strong> (former Vice Chancellor, NIEPA). Financial audits are performed by independent certified chartered accountants. For specific queries regarding statutory certificates, email <a href="mailto:info@aspire-india.org" style="color: var(--brand-primary); font-weight: 600;">info@aspire-india.org</a>.
          </p>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/trust-accountability.html', 'w') as f:
        f.write(content)
    print('pages/trust-accountability.html written:', len(content), 'bytes')

# =========================================================================
# 6. OUR TEAM (pages/team.html)
# =========================================================================
def build_team():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Meet the leadership and operational team behind ASPIRE India, dedicated to ensuring quality education across remote communities.">
  <title>Our Team — Leadership &amp; Field Professionals | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('team')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span>About Us</span>
          <span class="separator">/</span>
          <span class="current">Our Team</span>
        </nav>
        <h1 class="page-title">People who believe every child deserves a chance.</h1>
        <p class="page-lead">
          ASPIRE is powered by seasoned education specialists, researchers, community organisers, and field coordinators working across our operating states.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="leadership-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Executive Leadership</span>
          <h2 id="leadership-heading" class="section-title">Core Management Team</h2>
          <p class="section-subtitle">
            Directing operational strategy, programmatic excellence, and grassroots execution.
          </p>
        </div>

        <div class="team-grid reveal-stagger">
          <!-- Leader 1 -->
          <article class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">D</div>
              <div class="profile-info">
                <h3>Dayaram</h3>
                <div class="profile-role">Executive Director</div>
              </div>
            </div>
            <p class="profile-bio">
              Former Education Head at the Aga Khan Foundation (New Delhi) and Chief Consultant for 7 years in the Alternative Schooling Unit of DPEP and Sarva Shiksha Abhiyan (SSA) under the Ministry of Education, Government of India. He holds an M.A. and M.Phil. in Sociology from Jawaharlal Nehru University (JNU), bringing over three decades of seminal experience in elementary education reforms and community mobilization.
            </p>
          </article>

          <!-- Leader 2 -->
          <article class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">DT</div>
              <div class="profile-info">
                <h3>Dayanand Thakur</h3>
                <div class="profile-role">Finance Director</div>
              </div>
            </div>
            <p class="profile-bio">
              Oversees financial management, audit compliance, FCRA governance, and transparent fiscal allocations across all state project offices. Ensures that every rupee received from donors directly translates into accountable field activities.
            </p>
          </article>

          <!-- Leader 3 -->
          <article class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">KB</div>
              <div class="profile-info">
                <h3>Dr. Kartika Bhatia</h3>
                <div class="profile-role">Research and Evaluation Advisor</div>
              </div>
            </div>
            <p class="profile-bio">
              Spearheads research frameworks, baseline-endline impact evaluations, and child learning trajectory monitoring. Ensures that ASPIRE’s interventions remain scientifically anchored in verified educational evidence.
            </p>
          </article>

          <!-- Leader 4 -->
          <article class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">PB</div>
              <div class="profile-info">
                <h3>Prabodh Bhambal</h3>
                <div class="profile-role">Senior Advisor</div>
              </div>
            </div>
            <p class="profile-bio">
              Provides strategic mentorship on institutional partnerships, civil society alliances, and policy dialogues with national and state education departments.
            </p>
          </article>

          <!-- Leader 5 -->
          <article class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">VD</div>
              <div class="profile-info">
                <h3>Vinod Dhyani</h3>
                <div class="profile-role">HR &amp; Operations Manager</div>
              </div>
            </div>
            <p class="profile-bio">
              Coordinates human resource development, staff capacity training, and operational logistics across field offices in Odisha, Jharkhand, West Bengal, Chhattisgarh, and Delhi.
            </p>
          </article>

          <!-- Field Coordinators Note -->
          <article class="profile-card" style="background: var(--bg-surface-green); border-color: rgba(27, 94, 32, 0.2);">
            <div class="profile-header">
              <div class="profile-avatar" style="background: var(--brand-secondary);">FC</div>
              <div class="profile-info">
                <h3 style="color: var(--brand-secondary);">Field Coordinators &amp; Educators</h3>
                <div class="profile-role" style="color: var(--brand-secondary);">Grassroots Force</div>
              </div>
            </div>
            <p class="profile-bio">
              Over 300 dedicated field animators, bridge course teachers, and community facilitators living and working directly inside remote habitations. They are the true heartbeat of ASPIRE’s mission.
            </p>
          </article>
        </div>

        <div style="text-align: center; margin-top: var(--space-12);" class="reveal">
          <a href="board-advisors.html" class="btn btn-outline">
            View Our Board &amp; Advisors &rarr;
          </a>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/team.html', 'w') as f:
        f.write(content)
    print('pages/team.html written:', len(content), 'bytes')

# =========================================================================
# 7. BOARD & ADVISORS (pages/board-advisors.html)
# =========================================================================
def build_board():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Discover ASPIRE India's governing body, chaired by Dr. N.V. Varghese, providing strategic oversight, policy direction, and governance integrity.">
  <title>Board &amp; Advisors — Governance Leadership | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('board')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span>About Us</span>
          <span class="separator">/</span>
          <span class="current">Board &amp; Advisors</span>
        </nav>
        <h1 class="page-title">Governance leadership rooted in scholarship &amp; service.</h1>
        <p class="page-lead">
          ASPIRE is guided by an eminent governing body comprising internationally renowned education planners, public policy thinkers, and institutional administrators.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="board-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Governance Oversight</span>
          <h2 id="board-heading" class="section-title">Governing Body Leadership</h2>
          <p class="section-subtitle">
            Ensuring strategic fidelity, institutional accountability, and alignment with national educational priorities.
          </p>
        </div>

        <div class="container-narrow reveal" style="margin-bottom: var(--space-12);">
          <article class="profile-card" style="border: 2px solid var(--brand-primary); box-shadow: var(--shadow-xl);">
            <div class="profile-header">
              <div class="profile-avatar" style="width: 72px; height: 72px; font-size: 1.75rem;">NV</div>
              <div class="profile-info">
                <h3 style="font-size: 1.5rem;">Dr. N.V. Varghese</h3>
                <div class="profile-role" style="font-size: 1rem; color: var(--brand-primary);">Chairperson, Governing Body</div>
              </div>
            </div>
            <p class="profile-bio" style="font-size: 0.95rem; line-height: 1.7;">
              Former Vice Chancellor of the <strong>National Institute of Educational Planning and Administration (NIEPA)</strong>, New Delhi, and Founding Director of the Centre for Policy Research in Higher Education (CPRHE/NIEPA). Dr. Varghese previously served as Head of Governance and Management in Education at the <strong>International Institute for Educational Planning (IIEP / UNESCO)</strong> in Paris. With decades of distinguished international leadership, he steers ASPIRE’s vision toward universal quality education for all children.
            </p>
          </article>
        </div>

        <!-- Governance Framework Principles -->
        <div class="section-header reveal" style="margin-top: var(--space-16);">
          <span class="section-tag">Committees &amp; Oversight</span>
          <h2 class="section-title">Our Governance Principles</h2>
        </div>

        <div class="pillars-grid reveal-stagger">
          <div class="pillar-card">
            <div class="pillar-icon">⚖️</div>
            <h3 class="pillar-title">Fiduciary Diligence</h3>
            <p class="pillar-desc">
              All financial statements, statutory audits, and program expenditures are rigorously examined by the Governing Body prior to public submission and dissemination.
            </p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">🎯</div>
            <h3 class="pillar-title">Programmatic Independence</h3>
            <p class="pillar-desc">
              The board guarantees that interventions remain faithful to the highest standards of child rights, pedagogical dignity, and social equity without political compromise.
            </p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">🤝</div>
            <h3 class="pillar-title">Conflict of Interest Safeguards</h3>
            <p class="pillar-desc">
              ASPIRE enforces strict conflict-of-interest disclosures for all board members and key management personnel, ensuring pure public charitable purpose.
            </p>
          </div>
        </div>

        <div style="text-align: center; margin-top: var(--space-12);" class="reveal">
          <a href="trust-accountability.html" class="btn btn-primary">
            Review Statutory Disclosures &amp; Audits
          </a>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/board-advisors.html', 'w') as f:
        f.write(content)
    print('pages/board-advisors.html written:', len(content), 'bytes')

# =========================================================================
# 8. PARTNERSHIPS (pages/partnerships.html)
# =========================================================================
def build_partnerships():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Collaborate with ASPIRE India. We partner with CSR foundations, corporate donors, state governments, and research bodies to transform public education.">
  <title>Partnerships — Collaborate for Systemic Education | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('partnerships')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span class="current">Partnerships</span>
        </nav>
        <h1 class="page-title">Better education takes collective effort.</h1>
        <p class="page-lead">
          We believe meaningful change in public education is built through collective action. We work with institutions and organisations that share our commitment to strengthening education systems.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="collab-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Collaboration Tracks</span>
          <h2 id="collab-heading" class="section-title">How We Partner With You</h2>
          <p class="section-subtitle">
            Customized, high-impact avenues for CSR entities, foundations, and institutional stakeholders.
          </p>
        </div>

        <!-- Partnership Themes -->
        <div class="programmes-grid reveal-stagger" style="margin-bottom: var(--space-16);">
          <div class="programme-card">
            <span class="pillar-badge" style="background: var(--brand-primary-light); color: var(--brand-primary);">Track 01</span>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Corporate Social Responsibility (CSR)</h3>
            <p class="pillar-desc">
              Partner with ASPIRE to implement end-to-end education interventions aligned with Schedule VII of the Companies Act. We deliver baseline design, on-ground execution, verified metrics, and rigorous CSR compliance reporting.
            </p>
          </div>

          <div class="programme-card">
            <span class="pillar-badge" style="background: var(--brand-secondary-light); color: var(--brand-secondary);">Track 02</span>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Government &amp; Systemic Collaboration</h3>
            <p class="pillar-desc">
              Working as a technical support agency for State Departments of Education, District Administrations, and DIETs to implement FLN models, teacher coaching, and Child Labour Free Zone declarations.
            </p>
          </div>

          <div class="programme-card">
            <span class="pillar-badge" style="background: #E0F2FE; color: #0369A1;">Track 03</span>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Development Foundations &amp; Multilaterals</h3>
            <p class="pillar-desc">
              Joint programmatic scaling of residential bridge courses, early childhood care, and adolescent girls’ education in high-priority tribal and aspirational districts.
            </p>
          </div>

          <div class="programme-card">
            <span class="pillar-badge" style="background: #EDE9FE; color: #6D28D9;">Track 04</span>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Academic Research &amp; Evaluation</h3>
            <p class="pillar-desc">
              Collaborate on longitudinal learning assessments, sociological studies on community education governance, and evaluation of pedagogical innovations in multilingual contexts.
            </p>
          </div>
        </div>

        <!-- Partnership Enquiry Form -->
        <div class="container-narrow reveal">
          <div style="background: #fff; border-radius: var(--radius-2xl); border: 1px solid var(--border-light); padding: var(--space-8); box-shadow: var(--shadow-xl);">
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-2); text-align: center;">Initiate a Partnership Dialogue</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); text-align: center; margin-bottom: var(--space-6);">
              Please provide details about your organisation and area of collaboration interest.
            </p>

            <form id="partnership-form" novalidate>
              <div class="form-field">
                <label for="contact-name" class="form-label">Full Name <span style="color: var(--color-error);">*</span></label>
                <input type="text" id="contact-name" class="form-input" placeholder="e.g. Rahul Mehta" required>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label for="org-name" class="form-label">Organisation / Institution <span style="color: var(--color-error);">*</span></label>
                <input type="text" id="org-name" class="form-input" placeholder="e.g. Tata Trusts / Foundation Name" required>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label for="contact-email" class="form-label">Work Email Address <span style="color: var(--color-error);">*</span></label>
                <input type="email" id="contact-email" class="form-input" placeholder="name@company.org" required>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label for="contact-phone" class="form-label">Phone / Mobile Number</label>
                <input type="tel" id="contact-phone" class="form-input" placeholder="Optional contact number">
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label for="partner-track" class="form-label">Area of Partnership <span style="color: var(--color-error);">*</span></label>
                <select id="partner-track" class="form-select" required>
                  <option value="">Select an area of interest...</option>
                  <option value="csr">Corporate Social Responsibility (CSR)</option>
                  <option value="govt">Government / Systemic Collaboration</option>
                  <option value="foundation">Institutional Grant / Foundation</option>
                  <option value="research">Research &amp; Evaluation Partnership</option>
                  <option value="other">Other Inquiry</option>
                </select>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label for="partner-message" class="form-label">Message / Collaboration Scope <span style="color: var(--color-error);">*</span></label>
                <textarea id="partner-message" class="form-textarea" rows="4" placeholder="Briefly describe your objectives, target geography, or project vision..." required></textarea>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <div class="form-field">
                <label style="display: flex; gap: var(--space-2); align-items: flex-start; cursor: pointer; font-size: 0.8rem; color: var(--text-secondary);">
                  <input type="checkbox" id="partner-consent" required style="margin-top: 3px;">
                  <span>I agree to ASPIRE India contacting me regarding this partnership enquiry.</span>
                </label>
                <div class="field-error" aria-live="polite"></div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg partnership-submit-btn" style="width: 100%; margin-top: var(--space-4);" data-track="partnership:submit">
                Submit Partnership Enquiry
              </button>

              <div class="partnership-success" aria-live="polite" style="display: none; background: var(--color-success-bg); border: 1px solid var(--color-success); padding: var(--space-4); border-radius: var(--radius-md); text-align: center; margin-top: var(--space-4); color: var(--color-success); font-weight: 500;">
                ✓ Thank you for reaching out! Our partnerships team will review your enquiry and respond within 2 business days.
              </div>

              <div class="partnership-error" aria-live="assertive" style="display: none; background: var(--color-error-bg); border: 1px solid var(--color-error); padding: var(--space-4); border-radius: var(--radius-md); text-align: center; margin-top: var(--space-4); color: var(--color-error);">
                ⚠️ Something went wrong. Please check the fields or write directly to info@aspire-india.org.
              </div>

              <div class="prototype-disclaimer">
                <strong>ℹ️ PROTOTYPE NOTE:</strong> In this prototype demonstration, submissions are safely simulated and logged. For real partnership proposals, write to <a href="mailto:info@aspire-india.org" style="text-decoration: underline; font-weight: 600;">info@aspire-india.org</a>.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/partnerships.html', 'w') as f:
        f.write(content)
    print('pages/partnerships.html written:', len(content), 'bytes')

# =========================================================================
# 9. RESOURCES (pages/resources.html)
# =========================================================================
def build_resources():
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Explore ASPIRE India's publication archive, research studies, field newsletters, and educational media gallery.">
  <title>Resources — Reports, Publications &amp; Media | ASPIRE India</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
{get_header('resources')}

  <main id="main-content">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <span class="current">Resources</span>
        </nav>
        <h1 class="page-title">Knowledge that drives lasting change.</h1>
        <p class="page-lead">
          Access ASPIRE’s publications, annual reports, grassroots case studies, and media documentation.
        </p>
      </div>
    </header>

    <section class="section" aria-labelledby="resources-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">Library</span>
          <h2 id="resources-heading" class="section-title">Reports, Publications &amp; Research</h2>
          <p class="section-subtitle">
            Ground-level data, pedagogical guides, and policy perspectives from our field interventions.
          </p>
        </div>

        <div class="doc-list reveal-stagger" style="max-width: 860px; margin: 0 auto var(--space-16);">
          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">📊</div>
              <div>
                <h3 class="doc-title">State of Elementary Education in Tribal Clusters</h3>
                <div class="doc-meta">Research Monograph &bull; Focus on Keonjhar &amp; West Singhbhum &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Read &nearr;</a>
          </div>

          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">📖</div>
              <div>
                <h3 class="doc-title">Pedagogical Handbook for Multigrade Primary Classrooms</h3>
                <div class="doc-meta">Teaching-Learning Material &bull; Activity-Based FLN Toolkit &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Read &nearr;</a>
          </div>

          <div class="doc-card">
            <div class="doc-left">
              <div class="doc-icon">🛡️</div>
              <div>
                <h3 class="doc-title">Child Labour Free Zones (CLFZ) Handbook for Panchayats</h3>
                <div class="doc-meta">Community Governance Guide &bull; Village Tracking Modules &bull; PDF</div>
              </div>
            </div>
            <a href="https://aspire-india.org/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Read &nearr;</a>
          </div>
        </div>

        <!-- Newsletter & Media Notice -->
        <div class="container-narrow reveal" style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: var(--space-8); text-align: center;">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Stay Informed with ASPIRE Dispatches</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
            Receive quarterly updates on grassroots education innovations, child rights stories, and community achievements.
          </p>
          <div style="display: flex; gap: var(--space-2); max-width: 480px; margin: 0 auto;">
            <input type="email" class="form-input" placeholder="Enter your work email address" aria-label="Email for newsletter">
            <button type="button" class="btn btn-primary" onclick="alert('Thank you for subscribing to ASPIRE updates!');">Subscribe</button>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: var(--space-3);">
            For media enquiries, photography permissions, and press interviews, email <a href="mailto:info@aspire-india.org" style="color: var(--brand-primary);">info@aspire-india.org</a>.
          </p>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
</body>
</html>'''
    with open('/Users/mac/AspireIndia/pages/resources.html', 'w') as f:
        f.write(content)
    print('pages/resources.html written:', len(content), 'bytes')

# Run all remaining builders
build_trust()
build_team()
build_board()
build_partnerships()
build_resources()
