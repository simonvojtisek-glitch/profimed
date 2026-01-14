import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Package, AlertTriangle, CheckCircle, TrendingUp, Layers, Search, Filter, ArrowRight, Building2, Droplets, Hammer, Gem, Paintbrush, Wrench, Home, Sparkles, Box } from 'lucide-react';

// Category data based on validated structure
const categories = [
  { id: 1, name: "Lepidla na obklady a dlažby", skus: 65, percent: 9, icon: Layers, color: "#3B82F6",
    subcategories: ["Standardní C1T", "Flexibilní C2TE", "Vysoce flexibilní S1/S2", "Rychletuhnoucí", "Disperzní a speciální"],
    brands: ["MAPEI Keraflex", "Schönox Q-series", "Schomburg Monoflex"],
    research: "100% priority: Movement tolerance | 99% desire: Tile/substrate matching"
  },
  { id: 2, name: "Spárovací hmoty", skus: 180, percent: 24, icon: Paintbrush, color: "#8B5CF6", highlight: true,
    subcategories: ["Cementové flexibilní (Ultracolor Plus 50+ barev)", "Epoxidové (Kerapoxy Easy Design 45+ barev)", "Cementové standardní"],
    brands: ["MAPEI Ultracolor Plus", "MAPEI Kerapoxy Easy Design", "Schönox WD Flex"],
    research: "80% priority: Stain-free aesthetics | 76% desire: Color matching"
  },
  { id: 3, name: "Sanitární silikony", skus: 75, percent: 10, icon: Droplets, color: "#06B6D4",
    subcategories: ["Standardní barevné (Mapesil AC 45+ barev)", "S nízkým modulem", "Matné povrchy"],
    brands: ["MAPEI Mapesil AC", "Schönox ES"],
    research: "90% priority: Moisture-resistant assemblies | 70% desire: Mold resistance"
  },
  { id: 4, name: "Pružné tmely", skus: 35, percent: 5, icon: Box, color: "#F59E0B",
    subcategories: ["Polyuretanové", "MS polymerové", "Akrylové"],
    brands: ["Sika Sikaflex", "MAPEI Mapeflex"],
    research: "100% priority: Movement tolerance | 80% desire: Structural flexibility"
  },
  { id: 5, name: "Hydroizolace", skus: 90, percent: 12, icon: Droplets, color: "#10B981",
    subcategories: ["Interiérové stěrkové", "Exteriérové 2K", "Rychlé/speciální", "Těsnící pásky a manžety", "Bitumenové"],
    brands: ["MAPEI Mapelastic", "Schönox 1K/2K-DS", "Schomburg Aquafin"],
    research: "90% priority: Waterproof assemblies | 97% desire: Prevent water damage"
  },
  { id: 6, name: "Příprava podkladu", skus: 100, percent: 13, icon: Hammer, color: "#EF4444",
    subcategories: ["Penetrace", "Adhezní můstky", "Samonivelační stěrky", "Opravné malty", "Rychlovazné cementy"],
    brands: ["MAPEI Primer/Ultraplan", "Schönox SP/DE", "Sika MonoTop"],
    research: "90% priority: Predictable performance | 80% desire: Fast repairs"
  },
  { id: 7, name: "Průmyslové podlahy a nátěry", skus: 35, percent: 5, icon: Building2, color: "#F97316", isNew: true,
    subcategories: ["Epoxidové systémy", "Polyuretanové systémy", "Dekorativní stěrky", "Garážové systémy"],
    brands: ["Sika Sikafloor", "MAPEI Mapecoat", "Botament Beton Optik"],
    research: "95% desire: High-strength for heavy traffic | Was COMPLETELY MISSING!"
  },
  { id: 8, name: "Přírodní kámen", skus: 55, percent: 7, icon: Gem, color: "#EC4899",
    subcategories: ["Impregnace", "Zvýrazňovače barev", "Lepidla na kámen", "Čističe kamene", "Leštící pasty"],
    brands: ["Bellinzoni", "Tenax", "Sopro"],
    research: "70% priority: Protect from staining | Dedicated specialist niche"
  },
  { id: 9, name: "Lepidla na podlahoviny", skus: 12, percent: 2, icon: Home, color: "#6366F1", rightSized: true,
    subcategories: ["Na vinyl a LVT", "Na parkety"],
    brands: ["MAPEI Ultrabond", "Schönox Durocoll", "Sika SikaBond"],
    research: "Right-sized from 3→2 subcategories based on actual inventory"
  },
  { id: 10, name: "Čističe a údržba", skus: 25, percent: 3, icon: Sparkles, color: "#14B8A6",
    subcategories: ["Na spáry", "Na dlažbu", "Na dřevo"],
    brands: ["MAPEI UltraCare", "Bellinzoni", "Synteko"],
    research: "60% priority: Easy post-installation cleaning"
  },
  { id: 11, name: "Doplňky a příslušenství", skus: 30, percent: 4, icon: Wrench, color: "#64748B",
    subcategories: ["Armovací tkaniny", "Kročejový útlum", "Dekorativní přísady", "Křemičité písky"],
    brands: ["Perlinka", "MAPEI Mapenet", "Schönox"],
    research: "Supporting products for complete installation systems"
  }
];

const structuralGaps = [
  { title: "Industrial Floor Coatings Invisible", fixed: true, description: "Sikafloor and Mapecoat (35 SKUs, 5%) had no category", solution: "New 'Průmyslové podlahy' category created" },
  { title: "Grouts Poorly Organized", fixed: true, description: "180 SKUs (24%) mixed by brand, cement/epoxy combined", solution: "Chemistry-based subcategories (cement flex/epoxy/standard)" },
  { title: "Silicones Mixed with Sealants", fixed: true, description: "75 silicone SKUs combined with PU/MS sealants", solution: "Separated into own category (#3)" },
  { title: "Natural Stone Niche Scattered", fixed: true, description: "Bellinzoni + Tenax (55 SKUs) had no unified presence", solution: "Dedicated 'Přírodní kámen' category (#8)" },
  { title: "Flexibility Classes Not Visible", fixed: true, description: "S1/S2 adhesives buried in product specs", solution: "Subcategories by flexibility class" },
  { title: "Hardware Mixed with Chemicals", fixed: true, description: "75 profile/hardware SKUs (10%) don't belong here", solution: "Identified for relocation to 'Stavební nářadí'" }
];

const productGaps = [
  { title: "Underfloor Heating Products", priority: "critical", description: "UFH compatibility mentioned but no dedicated line", action: "Badge existing UFH-compatible products; source dedicated kits" },
  { title: "DIY-Friendly Small Packaging", priority: "critical", description: "Primarily professional bulk sizes (5-25kg)", action: "Negotiate 1-3kg retail packs with suppliers" },
  { title: "Low-VOC / Eco-Labeled Range", priority: "critical", description: "Limited visibility of eco-labeled products", action: "Badge existing Eco products; source additional options" },
  { title: "Complete System Bundles", priority: "important", description: "All components sold separately", action: "Create bathroom/terrace renovation kits" },
  { title: "Antimicrobial Certified Products", priority: "important", description: "Basic anti-mold mentioned, no certifications visible", action: "Highlight antimicrobial properties; source certified products" },
  { title: "Digital Application Guides", priority: "important", description: "Technical datasheets only", action: "Develop video tutorials, QR guides, calculators" }
];

const filters = [
  { name: "Třída flexibility", options: ["C1T Standardní", "C2TE Flexibilní", "S1 Vysoce flexibilní", "S2 Nejvyšší"] },
  { name: "Typ aplikace", options: ["Interiér", "Exteriér", "Mokré prostory", "Podlahové topení"] },
  { name: "Doba zpracování", options: ["Standardní", "Prodloužená", "Rychletuhnoucí"] },
  { name: "Typ materiálu", options: ["Keramika", "Porcelán", "Přírodní kámen", "Velkoformát"] },
  { name: "Barevné provedení", options: ["Základní", "Designové barvy (50+)", "Transparentní"] },
  { name: "Chemické složení", options: ["Cementové", "Epoxidové", "Polyuretanové", "Disperzní"] }
];

export default function ChytreMaterialyPresentation() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedGap, setExpandedGap] = useState(null);

  const sections = [
    { id: 'overview', label: 'Přehled', icon: Package },
    { id: 'current', label: 'Současný stav', icon: AlertTriangle },
    { id: 'structure', label: 'Nová struktura', icon: Layers },
    { id: 'categories', label: 'Kategorie detailně', icon: Search },
    { id: 'filters', label: 'Filtry', icon: Filter },
    { id: 'gaps', label: 'Gap analýza', icon: CheckCircle },
    { id: 'benchmark', label: 'Benchmark', icon: TrendingUp },
    { id: 'impact', label: 'Business Impact', icon: TrendingUp }
  ];

  const totalSKUs = categories.reduce((sum, cat) => sum + cat.skus, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#e2e8f0'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          font-weight: 500;
        }
        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
        }
        .nav-item.active {
          background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2));
          border-color: rgba(59,130,246,0.4);
          color: #fff;
        }

        .category-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .category-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        .stat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .gap-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .gap-card:hover {
          border-color: rgba(255,255,255,0.15);
        }

        .section-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .highlight-box {
          background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15));
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 16px;
          padding: 24px;
        }

        .filter-tag {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          font-size: 13px;
          margin: 4px;
          transition: all 0.2s ease;
        }
        .filter-tag:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: '24px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#64748b', letterSpacing: 2, marginBottom: 4 }}>
            OUTFINDO × CHYTRÉ MATERIÁLY
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Category Tree Reorganization
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="stat-card" style={{ padding: '12px 24px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{totalSKUs}</span>
            <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>SKUs analyzed</span>
          </div>
          <div className="stat-card" style={{ padding: '12px 24px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: '#10b981' }}>11</span>
            <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>new categories</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar Navigation */}
        <nav style={{
          width: 280,
          padding: '32px 16px',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky',
          top: 89,
          height: 'calc(100vh - 89px)',
          overflowY: 'auto'
        }}>
          <div className="section-title">Navigace</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map(section => (
              <div
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon size={18} />
                <span>{section.label}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '48px', maxWidth: 1200 }}>

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Přehled projektu
              </h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48, lineHeight: 1.7 }}>
                Komplexní analýza a reorganizace kategorizace produktů stavební chemie na základě výzkumu zákaznických cílů a validace skutečného inventáře.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
                <div className="stat-card">
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 48, fontWeight: 700, color: '#3b82f6' }}>742</div>
                  <div style={{ color: '#64748b', marginTop: 8 }}>SKUs analyzováno</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 48, fontWeight: 700, color: '#8b5cf6' }}>25</div>
                  <div style={{ color: '#64748b', marginTop: 8 }}>zákaznických cílů</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 48, fontWeight: 700, color: '#10b981' }}>11</div>
                  <div style={{ color: '#64748b', marginTop: 8 }}>nových kategorií</div>
                </div>
              </div>

              <div className="highlight-box">
                <div className="section-title">Klíčový závěr</div>
                <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
                  Reorganizace řeší strukturální problémy bez nutnosti nových produktů
                </h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                  Lepší organizace stávajících 742 produktů přinese okamžité zlepšení zákaznické zkušenosti. Produktové mezery představují dlouhodobé příležitosti k expanzi.
                </p>
              </div>
            </div>
          )}

          {/* Current State Section */}
          {activeSection === 'current' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Současný stav</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Produktová organizace založená na značkách místo zákaznických potřeb
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <div className="section-title">Problémy současné struktury</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { issue: "Průmyslové podlahy neviditelné", detail: "35 SKUs (5%) bez kategorie" },
                      { issue: "Spárovací hmoty špatně organizované", detail: "180 SKUs smíchané dle značky" },
                      { issue: "Silikony smíchané s tmely", detail: "75 SKUs v jedné kategorii" },
                      { issue: "Přírodní kámen rozptýlen", detail: "55 specializovaných SKUs rozházeno" },
                      { issue: "Třídy flexibility neviditelné", detail: "S1/S2 skryté v popisech" },
                      { issue: "Hardware smíchaný s chemií", detail: "75 SKUs profilů nepatří sem" }
                    ].map((item, i) => (
                      <div key={i} style={{ padding: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#fca5a5' }}>{item.issue}</div>
                        <div style={{ fontSize: 14, color: '#94a3b8' }}>{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="section-title">Matoucí navigace</div>
                  <div style={{ padding: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 8, fontWeight: 600 }}>SOUČASNÁ STRUKTURA</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#64748b', lineHeight: 2 }}>
                        Stavební chemie → Spárovací hmoty → Brand X → Kerapoxy Easy Design
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#10b981', marginBottom: 8, fontWeight: 600 }}>NOVÁ STRUKTURA</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#94a3b8', lineHeight: 2 }}>
                        Stavební chemie → Spárovací hmoty → Epoxidové → Kerapoxy Easy Design
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 32 }}>
                    <div className="section-title">Co zákazníci hledají vs. co najdou</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                      {[
                        { search: "flexibilní lepidlo na velkoformát", finds: "Musí procházet značky" },
                        { search: "epoxidová spára šedá", finds: "45 barev schovaných" },
                        { search: "hydroizolace do sprchy", finds: "Příslušenství jinde" }
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                          <span style={{ color: '#94a3b8' }}>"{item.search}"</span>
                          <span style={{ fontSize: 13 }}>{item.finds}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Structure Section */}
          {activeSection === 'structure' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Nová struktura kategorií</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                11 kategorií validovaných proti inventáři a zákaznickému výzkumu
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="category-card"
                    style={{
                      borderLeft: `4px solid ${cat.color}`,
                      ...(cat.highlight ? { background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' } : {}),
                      ...(cat.isNew ? { background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)' } : {})
                    }}
                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: `${cat.color}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <cat.icon size={22} color={cat.color} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontWeight: 600, fontSize: 17 }}>{cat.id}. {cat.name}</span>
                            {cat.highlight && <span className="badge" style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>Největší</span>}
                            {cat.isNew && <span className="badge" style={{ background: 'rgba(249,115,22,0.2)', color: '#fb923c' }}>Nová</span>}
                            {cat.rightSized && <span className="badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>Optimalizováno</span>}
                          </div>
                          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
                            {cat.skus} SKUs • {cat.percent}% inventáře
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ width: 120 }}>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${cat.percent * 4}%`, background: cat.color }} />
                          </div>
                        </div>
                        {expandedCategory === cat.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </div>

                    {expandedCategory === cat.id && (
                      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <div>
                            <div className="section-title">Podkategorie</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {cat.subcategories.map((sub, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8' }}>
                                  <ArrowRight size={14} color={cat.color} />
                                  {sub}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="section-title">Klíčové značky</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {cat.brands.map((brand, i) => (
                                <span key={i} className="filter-tag">{brand}</span>
                              ))}
                            </div>
                            <div className="section-title" style={{ marginTop: 20 }}>Zákaznický výzkum</div>
                            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{cat.research}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Relocation note */}
              <div style={{ marginTop: 32, padding: 24, background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.3)', borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <ArrowRight size={20} color="#94a3b8" />
                  <span style={{ fontWeight: 600 }}>K přesunu: Profily a lišty</span>
                  <span className="badge" style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8' }}>75 SKUs • 10%</span>
                </div>
                <p style={{ color: '#64748b', fontSize: 14 }}>
                  Hardware položky (Marcons, Balconi profily) doporučujeme přesunout do kategorie "Stavební nářadí"
                </p>
              </div>
            </div>
          )}

          {/* Categories Detail Section */}
          {activeSection === 'categories' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Kategorie detailně</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Klikněte na kategorii pro zobrazení kompletní struktury
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="category-card"
                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                    style={{
                      cursor: 'pointer',
                      ...(expandedCategory === cat.id ? { gridColumn: 'span 2' } : {})
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 14,
                        background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}10)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${cat.color}40`
                      }}>
                        <cat.icon size={26} color={cat.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: cat.color }}>#{cat.id}</span>
                          {cat.highlight && <span style={{ fontSize: 16 }}>*</span>}
                          {cat.isNew && <span style={{ fontSize: 16 }}>NEW</span>}
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{cat.name}</h3>
                        <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#64748b' }}>
                          <span><strong style={{ color: '#fff' }}>{cat.skus}</strong> SKUs</span>
                          <span><strong style={{ color: '#fff' }}>{cat.percent}%</strong> inventáře</span>
                        </div>
                      </div>
                      <div style={{ color: '#64748b' }}>
                        {expandedCategory === cat.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </div>

                    {expandedCategory === cat.id && (
                      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                          <div>
                            <div className="section-title">Podkategorie</div>
                            {cat.subcategories.map((sub, i) => (
                              <div key={i} style={{
                                padding: '10px 14px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 8,
                                marginBottom: 8,
                                fontSize: 14,
                                borderLeft: `3px solid ${cat.color}`
                              }}>
                                {sub}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="section-title">Hlavní značky</div>
                            {cat.brands.map((brand, i) => (
                              <div key={i} style={{
                                padding: '10px 14px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 8,
                                marginBottom: 8,
                                fontSize: 14
                              }}>
                                {brand}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="section-title">Zákaznický výzkum</div>
                            <div style={{
                              padding: 16,
                              background: `${cat.color}10`,
                              border: `1px solid ${cat.color}30`,
                              borderRadius: 12,
                              fontSize: 14,
                              lineHeight: 1.7,
                              color: '#94a3b8'
                            }}>
                              {cat.research}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters Section */}
          {activeSection === 'filters' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Sekundární filtry</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Po výběru hlavní kategorie zobrazit relevantní filtry
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                {filters.map((filter, i) => (
                  <div key={i} className="category-card">
                    <div className="section-title">{filter.name}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      {filter.options.map((opt, j) => (
                        <span key={j} className="filter-tag">{opt}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 48 }}>
                <div className="section-title">Příklad použití filtrů</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div className="stat-card" style={{ textAlign: 'left', padding: 24 }}>
                    <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Zákazník hledá:</div>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>"Lepidlo na velkoformát do koupelny"</div>
                    <div style={{ fontSize: 13 }}>
                      <div style={{ marginBottom: 4 }}>→ Kategorie: <span style={{ color: '#3b82f6' }}>Lepidla na obklady</span></div>
                      <div style={{ marginBottom: 4 }}>→ Flexibilita: <span style={{ color: '#10b981' }}>S1/S2</span></div>
                      <div>→ Aplikace: <span style={{ color: '#8b5cf6' }}>Mokré prostory</span></div>
                    </div>
                  </div>
                  <div className="stat-card" style={{ textAlign: 'left', padding: 24 }}>
                    <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Zákazník hledá:</div>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>"Barevná spára pro designovou koupelnu"</div>
                    <div style={{ fontSize: 13 }}>
                      <div style={{ marginBottom: 4 }}>→ Kategorie: <span style={{ color: '#8b5cf6' }}>Spárovací hmoty</span></div>
                      <div style={{ marginBottom: 4 }}>→ Chemie: <span style={{ color: '#f59e0b' }}>Epoxidové</span></div>
                      <div>→ Barvy: <span style={{ color: '#ec4899' }}>Designové (45+)</span></div>
                    </div>
                  </div>
                  <div className="stat-card" style={{ textAlign: 'left', padding: 24 }}>
                    <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Zákazník hledá:</div>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>"Rychlá oprava podlahy v garáži"</div>
                    <div style={{ fontSize: 13 }}>
                      <div style={{ marginBottom: 4 }}>→ Kategorie: <span style={{ color: '#f97316' }}>Průmyslové podlahy</span></div>
                      <div style={{ marginBottom: 4 }}>→ Typ: <span style={{ color: '#06b6d4' }}>Garážové systémy</span></div>
                      <div>→ Zpracování: <span style={{ color: '#ef4444' }}>Rychletuhnoucí</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gap Analysis Section */}
          {activeSection === 'gaps' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Gap analýza</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Strukturální mezery (opraveny reorganizací) vs. produktové mezery (vyžadují akci)
              </p>

              <div style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <CheckCircle size={24} color="#10b981" />
                  <h3 style={{ fontSize: 24, fontWeight: 600 }}>Strukturální mezery – OPRAVENO</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {structuralGaps.map((gap, i) => (
                    <div key={i} className="gap-card">
                      <div
                        style={{ padding: 20, cursor: 'pointer' }}
                        onClick={() => setExpandedGap(expandedGap === `s${i}` ? null : `s${i}`)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <CheckCircle size={18} color="#10b981" />
                            <span style={{ fontWeight: 600 }}>{gap.title}</span>
                          </div>
                          {expandedGap === `s${i}` ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </div>
                      {expandedGap === `s${i}` && (
                        <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ paddingTop: 16 }}>
                            <div style={{ fontSize: 14, color: '#ef4444', marginBottom: 8 }}>Problém:</div>
                            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>{gap.description}</p>
                            <div style={{ fontSize: 14, color: '#10b981', marginBottom: 8 }}>Řešení:</div>
                            <p style={{ fontSize: 14, color: '#94a3b8' }}>{gap.solution}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <AlertTriangle size={24} color="#f59e0b" />
                  <h3 style={{ fontSize: 24, fontWeight: 600 }}>Produktové mezery – VYŽADUJÍ AKCI</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {productGaps.map((gap, i) => (
                    <div key={i} className="gap-card">
                      <div
                        style={{ padding: 20, cursor: 'pointer' }}
                        onClick={() => setExpandedGap(expandedGap === `p${i}` ? null : `p${i}`)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span className="badge" style={{
                              background: gap.priority === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                              color: gap.priority === 'critical' ? '#fca5a5' : '#fcd34d'
                            }}>
                              {gap.priority === 'critical' ? 'Kritické' : 'Důležité'}
                            </span>
                            <span style={{ fontWeight: 600 }}>{gap.title}</span>
                          </div>
                          {expandedGap === `p${i}` ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </div>
                      {expandedGap === `p${i}` && (
                        <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ paddingTop: 16 }}>
                            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Současný stav:</div>
                            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>{gap.description}</p>
                            <div style={{ fontSize: 14, color: '#3b82f6', marginBottom: 8 }}>Doporučená akce:</div>
                            <p style={{ fontSize: 14, color: '#94a3b8' }}>{gap.action}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Benchmark Section */}
          {activeSection === 'benchmark' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Benchmark: Konkurenční návrh</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Srovnání konkurenčního návrhu s naší strukturou validovanou výzkumem
              </p>

              {/* Summary Box */}
              <div style={{ padding: 24, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 16, marginBottom: 32 }}>
                <div className="section-title" style={{ color: '#fca5a5' }}>SHRNUTÍ</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#fca5a5' }}>
                  56% inventáře špatně organizováno v konkurenčním návrhu
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  Konkurenční struktura zachovává produktově-centrický přístup, který neřeší klíčové problémy zákaznického objevování produktů identifikované ve výzkumu.
                </p>
              </div>

              {/* Critical Flaws */}
              <div className="section-title" style={{ marginBottom: 16 }}>KRITICKÉ NEDOSTATKY KONKURENČNÍHO NÁVRHU</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {[
                  {
                    title: "Průmyslové podlahy CHYBÍ",
                    detail: "35 SKUs (5%) Sikafloor, Mapecoat kompletně neviditelné",
                    research: "95% zákazníků hledá 'vysokou pevnost pro intenzivní provoz'",
                    severity: "critical"
                  },
                  {
                    title: "Silikony smíchané s tmely",
                    detail: "75 SKUs (10%) + 45 barevných variant schováno v 'Tmely'",
                    research: "90% priorita: 'Vlhkoodolné sestavy v mokrých zónách'",
                    severity: "critical"
                  },
                  {
                    title: "Spárovací hmoty nevyzdviženy",
                    detail: "180 SKUs (24%) = NEJVĚTŠÍ kategorie uprostřed seznamu",
                    research: "80% priorita: 'Estetické povrchy bez skvrn'",
                    severity: "critical"
                  },
                  {
                    title: "Přírodní kámen rozptýlen",
                    detail: "55 SKUs Bellinzoni/Tenax bez dedikované kategorie",
                    research: "70% priorita: 'Ochrana před obarvením'",
                    severity: "critical"
                  },
                  {
                    title: "Hardware zahrnut",
                    detail: "75 SKUs profilů (10%) znečišťuje kategorii chemie",
                    research: "Nesouvisí s výzkumem stavební chemie",
                    severity: "warning"
                  },
                  {
                    title: "Třídy flexibility generické",
                    detail: "'Vysoce flexibilní' místo profesionálního S1/S2",
                    research: "100% priorita: 'Tolerance pohybu podkladu'",
                    severity: "warning"
                  }
                ].map((flaw, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      background: flaw.severity === 'critical' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                      border: `1px solid ${flaw.severity === 'critical' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                      borderRadius: 12
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{
                        fontSize: 12,
                        padding: '4px 8px',
                        borderRadius: 4,
                        background: flaw.severity === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                        color: flaw.severity === 'critical' ? '#fca5a5' : '#fcd34d'
                      }}>
                        {flaw.severity === 'critical' ? 'KRITICKÉ' : 'PROBLÉM'}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>{flaw.title}</div>
                    <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>{flaw.detail}</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>Výzkum: {flaw.research}</div>
                  </div>
                ))}
              </div>

              {/* Side by Side Comparison */}
              <div className="section-title" style={{ marginBottom: 16 }}>SROVNÁNÍ STRUKTUR</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                <div style={{ padding: 24, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <AlertTriangle size={20} color="#ef4444" />
                    <span style={{ fontWeight: 600, color: '#fca5a5' }}>Konkurenční návrh</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#94a3b8' }}>
                    {[
                      "Lepidla",
                      "Penetrace/Přísady",
                      "Samonivelační hmoty",
                      "Hydroizolace",
                      "Tmely (silikony + PU + MS smíchané)",
                      "Spárovací hmoty (uprostřed)",
                      "Čištění/Impregnace",
                      "Profily a příslušenství",
                      "Průmyslové podlahy CHYBÍ",
                      "Přírodní kámen CHYBÍ"
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        color: item.includes('CHYBÍ') ? '#ef4444' : '#94a3b8'
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: 24, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <CheckCircle size={20} color="#10b981" />
                    <span style={{ fontWeight: 600, color: '#34d399' }}>Naše struktura (validovaná)</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#94a3b8' }}>
                    {[
                      "1. Lepidla na obklady (65 SKUs)",
                      "2. Spárovací hmoty * (180 SKUs, 24%)",
                      "3. Sanitární silikony (75 SKUs)",
                      "4. Pružné tmely (35 SKUs)",
                      "5. Hydroizolace (90 SKUs)",
                      "6. Příprava podkladu (100 SKUs)",
                      "7. Průmyslové podlahy NEW (35 SKUs)",
                      "8. Přírodní kámen (55 SKUs)",
                      "9-11. Podlahoviny, Čističe, Doplňky",
                      "→ Hardware → Stavební nářadí"
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        color: item.includes('*') || item.includes('NEW') ? '#34d399' : '#94a3b8'
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Journey Example */}
              <div className="section-title" style={{ marginBottom: 16 }}>PŘÍKLAD: ZÁKAZNICKÁ CESTA</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div style={{ padding: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12 }}>
                  <div style={{ fontSize: 14, color: '#fca5a5', marginBottom: 8 }}>Konkurence: Zákazník hledá garážový nátěr</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#64748b' }}>
                    Chytré Materiály → ??? → ??? → Nenalezeno
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 8 }}>
                    Sikafloor Garage systém neviditelný
                  </div>
                </div>
                <div style={{ padding: 20, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12 }}>
                  <div style={{ fontSize: 14, color: '#34d399', marginBottom: 8 }}>Naše struktura: Stejný zákazník</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#94a3b8' }}>
                    → Průmyslové podlahy → Garážové systémy → Sikafloor
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 8 }}>
                    Jasná cesta od potřeby k produktu
                  </div>
                </div>
              </div>

              {/* Bottom Line */}
              <div style={{ marginTop: 32, padding: 24, background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16 }}>
                <div className="section-title">ZÁVĚR</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: '#ef4444' }}>56%</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>inventáře špatně<br/>v konkurenčním návrhu</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: '#10b981' }}>25</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>zákaznických cílů<br/>v naší validaci</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: '#3b82f6' }}>742</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>SKUs analyzováno<br/>v inventáři</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Impact Section */}
          {activeSection === 'impact' && (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Business Impact</h2>
              <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 48 }}>
                Očekávané přínosy reorganizace
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
                {[
                  { title: "Zákaznická zkušenost", items: ["Rychlejší nalezení produktů", "Lepší cross-selling", "Méně rozhodovací paralýzy", "140+ barevných variant viditelných"] },
                  { title: "Business přínosy", items: ["Vyšší konverzní poměr", "Vyšší průměrná objednávka", "Lepší retence zákazníků", "Konkurenční diferenciace"] },
                  { title: "SEO & Marketing", items: ["Lepší vyhledávací výkon", "Cílenější reklamy", "Content marketing příležitosti", "Kategorie = search queries"] }
                ].map((section, i) => (
                  <div key={i} className="stat-card" style={{ textAlign: 'left' }}>
                    <div className="section-title">{section.title}</div>
                    <div style={{ marginTop: 16 }}>
                      {section.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                          <CheckCircle size={16} color="#10b981" />
                          <span style={{ fontSize: 14 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="highlight-box" style={{ marginBottom: 48 }}>
                <div className="section-title">Klíčové metriky inventáře</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 24 }}>
                  {[
                    { label: "Spárovací hmoty", value: "24%", detail: "Největší kategorie – správně na pozici #2" },
                    { label: "Barevné varianty", value: "140+", detail: "Grouts + silikony nyní viditelné" },
                    { label: "Hardware k přesunu", value: "75 SKUs", detail: "10% inventáře do jiné kategorie" }
                  ].map((metric, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: '#8b5cf6' }}>{metric.value}</div>
                      <div style={{ fontWeight: 600, marginTop: 8 }}>{metric.label}</div>
                      <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{metric.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="section-title">Co se změní okamžitě vs. co vyžaduje další kroky</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
                  <div style={{ padding: 24, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16 }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#34d399' }}>
                      <CheckCircle size={20} /> Okamžitě (bez nových produktů)
                    </h4>
                    {[
                      "Průmyslové podlahy viditelné (35 SKUs)",
                      "Spárovací hmoty reorganizované (180 SKUs)",
                      "Silikony oddělené (75 SKUs)",
                      "Přírodní kámen dedikovaný (55 SKUs)",
                      "Hardware identifikován k přesunu (75 SKUs)"
                    ].map((item, i) => (
                      <div key={i} style={{ fontSize: 14, marginBottom: 8, paddingLeft: 28 }}>• {item}</div>
                    ))}
                  </div>
                  <div style={{ padding: 24, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 16 }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#fcd34d' }}>
                      <AlertTriangle size={20} /> Vyžaduje akci
                    </h4>
                    {[
                      { item: "UFH badging", effort: "Nízká náročnost" },
                      { item: "Malá retail balení", effort: "Střední náročnost" },
                      { item: "Low-VOC viditelnost", effort: "Nízká náročnost" },
                      { item: "Bundle kity", effort: "Nízká náročnost" },
                      { item: "Digitální průvodci", effort: "Střední náročnost" }
                    ].map((item, i) => (
                      <div key={i} style={{ fontSize: 14, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ paddingLeft: 28 }}>• {item.item}</span>
                        <span style={{ color: '#64748b', fontSize: 12 }}>{item.effort}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
