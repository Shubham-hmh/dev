import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('Sending...')
    try {
      const res = await fetch('http://localhost:5000/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setFormStatus('Message sent! Check your email for confirmation.')
        setForm({ name: '', email: '', message: '' })
      } else {
        setFormStatus('Failed to send message. Please try again.')
      }
    } catch {
      setFormStatus('Failed to send message. Please try again.')
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      let currentSection = 'home'
      let minDistance = Infinity
      
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementCenter = rect.top + rect.height / 2
          const distance = Math.abs(elementCenter - 100)
          
          if (distance < minDistance) {
            minDistance = distance
            currentSection = section
          }
        }
      })
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    // Call once on mount to set initial active section
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">SK</span>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </a>
            <a 
              href="#experience" 
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </a>
            <a 
              href="#skills" 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </a>
          </div>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Shubham Kumar</span>
            </h1>
            <h2 className="hero-subtitle">Software Developer</h2>
            <p className="hero-description">
              Proficient in MERN STACK. Passionate about solving complex problems through 
              Technology and Critical Thinking, DSA.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-placeholder">SK</div>
              </div>
              <div className="profile-info">
                <h3>Shubham Kumar</h3>
                <p>Software Developer</p>
                <div className="social-links">
                  <a href="https://github.com/Shubham-hmh" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/shubham-kumar-487a34202/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://leetcode.com/u/Shubham_hmh/" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-code"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I am a passionate Software Developer with expertise in the MERN stack and a strong foundation in 
                Data Structures & Algorithms. I love solving complex problems and creating innovative web solutions 
                that make a real impact.
              </p>
              <p>
                With experience in building SAAS applications, e-commerce platforms, and real-time systems, 
                I specialize in developing scalable web applications using modern technologies and best practices.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>2+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>4+</h3>
                  <p>Companies Worked</p>
                </div>
                <div className="stat">
                  <h3>8.2</h3>
                  <p>CGPA</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="about-card">
                <h3>Education</h3>
                <div className="education-item">
                  <h4>Bachelor of Technology</h4>
                  <p>Computer Science & Engineering</p>
                  <p>St. Andrews Institute of Technology and Management, Gurugram</p>
                  <span>Dec 2020 - 2024 | CGPA: 8.2</span>
                </div>
                <div className="education-item">
                  <h4>Intermediate (PCM)</h4>
                  <p>Ratandeep Model Senior Secondary School, Hanumangarh</p>
                  <span>Mar 2013-2019 | 90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          <div className="experience-timeline">
            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-company">
                  <h3>Moretasks Pvt. Ltd.</h3>
                  <span className="experience-date">June 2024 - Present</span>
                </div>
                <div className="experience-role">
                  <h4>Full Stack Developer</h4>
                </div>
              </div>
              <div className="experience-description">
                <p>I am working as a full stack developer, building SAAS application.</p>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-company">
                  <h3>Blaccsckull Platforms Pvt. Ltd. (Feedants)</h3>
                  <span className="experience-date">Aug 2023 – June 2024</span>
                </div>
                <div className="experience-role">
                  <h4>Full Stack Developer</h4>
                </div>
              </div>
              <div className="experience-description">
                <ul>
                  <li>Optimized the State Management of frontend using redux, having relevant experience in MERN Stack.</li>
                  <li>Expertise in WebSocket technology for real-time applications, making complex logic in backend for chat functionality.</li>
                  <li>Proficient in Agenda.js for efficient task scheduling, having knowledge of infinite scrolling in fetching chunks of data.</li>
                  <li>Experienced in making push notifications for mobile app and notifications for website.</li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-company">
                  <h3>Kreativan Technology Pvt. Ltd.</h3>
                  <span className="experience-date">Feb 2023 – Aug 2023</span>
                </div>
                <div className="experience-role">
                  <h4>Full Stack Developer</h4>
                </div>
              </div>
              <div className="experience-description">
                <ul>
                  <li>Engineered an intricate nested comments system encompassing database model development, logical structuring, and frontend UI implementation.</li>
                  <li>Architectured the backend API routes and system design.</li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-company">
                  <h3>Udghosh Welfare Pvt. Ltd.</h3>
                  <span className="experience-date">Nov 2022 - Feb 2023</span>
                </div>
                <div className="experience-role">
                  <h4>Full Stack Developer</h4>
                </div>
              </div>
              <div className="experience-description">
                <ul>
                  <li><strong>E-commerce Project - Wooden Furniture Website:</strong> Developed a comprehensive e-commerce platform using the MERN stack (MongoDB, Express, React.js, Node.js) with Redux for state management, featuring product management, cart, wishlist, and checkout functionalities.</li>
                  <li><strong>Payment Integration and AWS Hosting:</strong> Integrated secure Razorpay payment gateways and deployed the website on AWS S3 for scalable and reliable hosting of static assets.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">React.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Next.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">JavaScript</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Redux</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Material-UI</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Tailwind CSS</span>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Node.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Express.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Socket.io</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Agenda.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MongoDB</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MySQL</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">WebSocket</span>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>DevOps & Tools</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Nginx</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Docker</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">AWS (S3)</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Git & GitHub</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Postman</span>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Automation & Testing</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Puppeteer</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">QA Automation</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Web Scraping</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">E2E Testing</span>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Languages</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Core Java</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">C++</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Python</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">TypeScript</span>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Other Technologies</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">REST APIs</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">GraphQL</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">JWT</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">OAuth</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Razorpay</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">EasyLodge</div>
              </div>
              <div className="project-content">
                <h3>EasyLodge - QR Entry System</h3>
                <p>Developed an advanced QR-based entry/exit system that revolutionizes access control and attendance tracking. Utilized QR code technology to streamline the entry and exit process for individuals within a designated space.</p>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Redux</span>
                  <span>Material-UI</span>
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>MongoDB</span>
                  <span>QR Reader</span>
                </div>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">Shopmate</div>
              </div>
              <div className="project-content">
                <h3>Shopmate - E-commerce Platform</h3>
                <p>Designed and developed a React.js e-commerce platform integrating MongoDB, Node.js, and Express.js. Implemented secure Razorpay payment integration, email notifications, and a responsive design with JWT authentication and Google OAuth.</p>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Material-UI</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>JWT</span>
                  <span>MongoDB</span>
                  <span>Google OAuth</span>
                  <span>Razorpay</span>
                </div>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">TestTube</div>
              </div>
              <div className="project-content">
                <h3>TestTube - No-Code QA Automation Tool</h3>
                <p>A no-code QA automation tool built with Node.js, Agenda.js, Redux, and AWS S3. Provides comprehensive testing solutions for web applications with an intuitive interface.</p>
                <div className="project-tech">
                  <span>Node.js</span>
                  <span>Agenda.js</span>
                  <span>Redux</span>
                  <span>AWS S3</span>
                  <span>SES</span>
                  <span>QA Automation</span>
                </div>
                <div className="project-links">
                  <a href="https://app.testtube.io" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">Movie Rec</div>
              </div>
              <div className="project-content">
                <h3>Movie Recommendation System</h3>
                <p>Built a movie recommendation system based on user preferences, data analytics and classification methods. Utilized advanced data analytics concepts to classify and recommend movies according to user likes and dislikes.</p>
                <div className="project-tech">
                  <span>Python</span>
                  <span>Pandas</span>
                  <span>Scikit-learn</span>
                  <span>Data Analytics</span>
                  <span>Machine Learning</span>
                </div>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's collaborate! 🚀</h3>
              <p>Ready to build something amazing together? Whether it's a new project, collaboration opportunity, or just a tech chat - I'm always excited to connect with fellow developers.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:sk9664150090@gmail.com">sk9664150090@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Gurugram, India</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+919664150090">+91 9664150090</a>
                  </div>
                </div>
              </div>
              <div className="social-links-large">
                <a href="https://github.com/Shubham-hmh" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/shubham-kumar-487a34202/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://leetcode.com/u/Shubham_hmh/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i>
                </a>
              </div>
            </div>
            <div className="contact-form">
              <div className="form-header">
                <h3>POST /api/contact</h3>
                <p className="form-subtitle">Send a message to my inbox</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">name: string</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Enter your name..." 
                    required 
                    value={form.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email: string</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="your.email@example.com" 
                    required 
                    value={form.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="subject">subject: string</label>
                  <input 
                    type="text" 
                    id="subject"
                    placeholder="What's this about?" 
                    required 
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="message">message: string</label>
                  <textarea 
                    id="message"
                    placeholder="Type your thoughts here..." 
                    rows="5" 
                    required
                    value={form.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  <span className="btn-icon">⚡</span>
                  {isSubmitting ? 'Sending...' : 'POST { name, email, message } → /api/inbox'}
                </button>
                {formStatus && (
                  <div className="form-status" style={{ marginTop: '1rem', color: formStatus.startsWith('Message sent') ? 'green' : 'red' }}>
                    {formStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Shubham Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
