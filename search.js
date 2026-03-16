/* ── Search Index ─────────────────────────────────────────── */
const SEARCH_INDEX = [
  // ── Comparison page (index.html) ──────────────────────────
  // Admission Flows tab
  { title:"Annual Permanent Admissions, U.S. vs. Canada, 1970–2025", category:"Admission Flows", page:"comparison.html", tab:"flows", figId:"fig-1", keywords:"time series LPR green card permanent resident annual" },
  { title:"U.S. Admission Class Distribution", category:"Admission Flows", page:"comparison.html", tab:"flows", figId:"fig-2", keywords:"family employment diversity visa stacked bar" },
  { title:"Canada Admission Class Distribution", category:"Admission Flows", page:"comparison.html", tab:"flows", figId:"fig-3", keywords:"economic family refugee humanitarian stacked bar" },
  // Labor Market tab
  { title:"Labor Force Participation by Nativity", category:"Labor Market", page:"comparison.html", tab:"labor", figId:"fig-4", keywords:"employment LFPR native-born immigrant grouped bar" },
  { title:"Earnings Convergence, Years Since Landing", category:"Labor Market", page:"comparison.html", tab:"labor", figId:"fig-5", keywords:"median earnings income integration line chart" },
  { title:"Sectoral Employment Concentration, Immigrants vs. Native-Born", category:"Labor Market", page:"comparison.html", tab:"labor", figId:"fig-6", keywords:"industry sector heatmap location quotient" },
  // Fiscal Impact tab
  { title:"Net Fiscal Contribution by Immigration Cohort, U.S. vs. Canada", category:"Fiscal Impact", page:"comparison.html", tab:"fiscal", figId:"fig-7", keywords:"taxes benefits fiscal balance cohort" },
  { title:"U.S. Immigrant Fiscal Balance by Level of Government", category:"Fiscal Impact", page:"comparison.html", tab:"fiscal", figId:"fig-8", keywords:"federal state local waterfall NAS" },
  { title:"Canada Immigrant Fiscal Balance by Level of Government", category:"Fiscal Impact", page:"comparison.html", tab:"fiscal", figId:"fig-9", keywords:"federal provincial municipal PBO waterfall" },
  // Demography tab
  { title:"Age-Sex Distribution, Foreign-Born Population", category:"Demography", page:"comparison.html", tab:"demography", figId:"fig-10", keywords:"population pyramid age gender" },
  { title:"Educational Attainment, Immigrants vs. Native-Born", category:"Demography", page:"comparison.html", tab:"demography", figId:"fig-11", keywords:"education bachelor graduate credential" },
  { title:"Top Source Countries, U.S. and Canada, 2024", category:"Demography", page:"comparison.html", tab:"demography", figId:"fig-12", keywords:"choropleth map origin birth country" },
  // Policy tab
  { title:"Legislative Timeline, U.S. and Canada, 1965–2025", category:"Policy", page:"comparison.html", tab:"policy", figId:"fig-13", keywords:"Hart-Celler IRCA IIRIRA legislation law" },

  // ── United States page (us.html) ──────────────────────────
  { title:"Total LPR Admissions by Fiscal Year, 1970–2025", category:"Admission Flows", page:"us.html", tab:"us-flows", figId:"fig-us-1", keywords:"time series recession green card annual" },
  { title:"Admissions by Region of Birth, 1970–2025", category:"Admission Flows", page:"us.html", tab:"us-flows", figId:"fig-us-2", keywords:"area chart Europe Asia Latin America origin" },
  { title:"Top 10 Source Countries, Selected Decades", category:"Admission Flows", page:"us.html", tab:"us-flows", figId:"fig-us-3", keywords:"small multiples country ranking" },
  { title:"FY2024 Admissions by Visa Class", category:"Visa Categories", page:"us.html", tab:"us-visa", figId:"fig-us-4", keywords:"treemap family employment diversity" },
  { title:"Employment-Based Backlog by Country", category:"Visa Categories", page:"us.html", tab:"us-visa", figId:"fig-us-5", keywords:"wait time EB-2 EB-3 India per-country" },
  { title:"Employment and Earnings by Nativity", category:"Economic Impact", page:"us.html", tab:"us-econ", figId:"fig-us-6", keywords:"LFPR median weekly earnings CPS" },
  { title:"Immigrant Share by Industry Sector", category:"Economic Impact", page:"us.html", tab:"us-econ", figId:"fig-us-7", keywords:"donut STEM healthcare agriculture" },
  { title:"Net Fiscal Impact by Education Level and Time Since Arrival", category:"Economic Impact", page:"us.html", tab:"us-econ", figId:"fig-us-8", keywords:"taxes benefits NAS CBO education" },
  { title:"Foreign-Born Population Share by State, 2024", category:"Geography", page:"us.html", tab:"us-geo", figId:"fig-us-9", keywords:"choropleth state settlement California New York" },
  { title:"Legislative Milestones and Admission Volume, 1965–2025", category:"Policy Timeline", page:"us.html", tab:"us-policy", figId:"fig-us-10", keywords:"Hart-Celler IRCA DACA legislation" },

  // ── Canada page (canada.html) ─────────────────────────────
  { title:"Levels Plan Targets vs. Actual Admissions, 1990–2025", category:"Admission Flows", page:"canada.html", tab:"ca-flows", figId:"fig-ca-1", keywords:"time series target actual IRCC" },
  { title:"Admissions by Source Region, 1980–2025", category:"Admission Flows", page:"canada.html", tab:"ca-flows", figId:"fig-ca-2", keywords:"area chart Europe Asia Africa origin" },
  { title:"Admissions by Immigration Class, 2024", category:"Admission Flows", page:"canada.html", tab:"ca-flows", figId:"fig-ca-3", keywords:"economic family refugee stream" },
  { title:"Express Entry Minimum CRS Score by Invitation Round, 2015–2025", category:"Express Entry", page:"canada.html", tab:"ca-ee", figId:"fig-ca-4", keywords:"CRS cutoff draw score time series" },
  { title:"CRS Score Distribution of Invited Applicants, 2024", category:"Express Entry", page:"canada.html", tab:"ca-ee", figId:"fig-ca-5", keywords:"histogram distribution median" },
  { title:"Invitations by Program Stream, 2024", category:"Express Entry", page:"canada.html", tab:"ca-ee", figId:"fig-ca-6", keywords:"FSWP CEC PNP category pie" },
  { title:"Earnings Trajectories by Landing Cohort, 1–10 Years", category:"Economic Integration", page:"canada.html", tab:"ca-econ", figId:"fig-ca-7", keywords:"IMDB T4 earnings convergence cohort" },
  { title:"Immigrant–Native Earnings Gap by Education Level", category:"Economic Integration", page:"canada.html", tab:"ca-econ", figId:"fig-ca-8", keywords:"credential gap ratio" },
  { title:"Sectoral Employment Concentration, Immigrants vs. Canadian-Born", category:"Economic Integration", page:"canada.html", tab:"ca-econ", figId:"fig-ca-9", keywords:"NAICS location quotient industry LFS" },
  { title:"Permanent Resident Admissions by Province, 2000–2025", category:"Provincial Data", page:"canada.html", tab:"ca-prov", figId:"fig-ca-10", keywords:"province PNP Ontario BC stacked area" },
  { title:"PNP Nominations by Province, 2024", category:"Provincial Data", page:"canada.html", tab:"ca-prov", figId:"fig-ca-11", keywords:"provincial nominee bar chart per-capita" },
  { title:"Provincial Nominee Retention Rates, 1–5 Years", category:"Provincial Data", page:"canada.html", tab:"ca-prov", figId:"fig-ca-12", keywords:"retention interprovincial migration IMDB" },
  { title:"Age-Sex Distribution, Immigrant vs. Canadian-Born", category:"Demographics", page:"canada.html", tab:"ca-demo", figId:"fig-ca-13", keywords:"population pyramid age working-age" },
  { title:"Official Language Knowledge at Landing", category:"Demographics", page:"canada.html", tab:"ca-demo", figId:"fig-ca-14", keywords:"English French CLB NCLC language" },

  // ── Analysis sections (searchable headings) ───────────────
  { title:"Historical Trends and Admission Waves (U.S.)", category:"Admission Flows", page:"us.html", tab:"us-flows", figId:"fig-us-1", keywords:"IRCA legalization source-country composition" },
  { title:"Visa Category Allocation and Policy Architecture (U.S.)", category:"Visa Categories", page:"us.html", tab:"us-visa", figId:"fig-us-4", keywords:"family employment per-country ceiling backlog" },
  { title:"Economic Contributions and Labor Market Outcomes (U.S.)", category:"Economic Impact", page:"us.html", tab:"us-econ", figId:"fig-us-6", keywords:"STEM entrepreneur patent fiscal" },
  { title:"Geographic Distribution (U.S.)", category:"Geography", page:"us.html", tab:"us-geo", figId:"fig-us-9", keywords:"gateway state settlement new destination" },
  { title:"The Points-Based Framework and Express Entry (Canada)", category:"Express Entry", page:"canada.html", tab:"ca-ee", figId:"fig-ca-4", keywords:"CRS FSWP CEC category-based" },
  { title:"Provincial Nominee Programs and Regionalization (Canada)", category:"Provincial Data", page:"canada.html", tab:"ca-prov", figId:"fig-ca-10", keywords:"PNP retention Atlantic Prairie" },
  { title:"Economic Integration and Earnings (Canada)", category:"Economic Integration", page:"canada.html", tab:"ca-econ", figId:"fig-ca-7", keywords:"IMDB convergence credential recognition overqualification" },
  { title:"Demographic Profile and Social Indicators (Canada)", category:"Demographics", page:"canada.html", tab:"ca-demo", figId:"fig-ca-13", keywords:"age education language citizenship" },
];

/* ── Page labels for display ────────────────────────────── */
const PAGE_LABELS = {
  "index.html":      "Home",
  "comparison.html": "Comparison",
  "us.html":         "United States",
  "canada.html":     "Canada"
};

/* ── Modal logic ─────────────────────────────────────────── */
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.add('open');
  const input = overlay.querySelector('.search-input');
  input.value = '';
  input.focus();
  renderResults('');
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
}

function renderResults(query) {
  const container = document.getElementById('search-results');
  if (!query.trim()) { container.innerHTML = ''; return; }

  const q = query.toLowerCase();
  const matches = SEARCH_INDEX.filter(item => {
    const haystack = (item.title + ' ' + item.category + ' ' + item.keywords + ' ' + PAGE_LABELS[item.page]).toLowerCase();
    return q.split(/\s+/).every(word => haystack.includes(word));
  });

  if (matches.length === 0) {
    container.innerHTML = '<div class="search-no-results">No results found for "' + query + '"</div>';
    return;
  }

  container.innerHTML = matches.map(item => {
    const pageName = PAGE_LABELS[item.page] || item.page;
    return '<div class="search-result-item" onclick="goToResult(\'' + item.page + '\',\'' + item.tab + '\',\'' + item.figId + '\')">'
      + '<div class="sr-icon">&#x25A6;</div>'
      + '<div class="sr-body">'
      + '<div class="sr-title">' + item.title + '</div>'
      + '<div class="sr-meta">' + pageName + ' &middot; ' + item.category + '</div>'
      + '</div></div>';
  }).join('');
}

function goToResult(page, tab, figId) {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  if (currentPage === page) {
    activateTab(tab);
    closeSearch();
    setTimeout(() => {
      const el = document.getElementById(figId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  } else {
    window.location.href = page + '?tab=' + tab + '#' + figId;
  }
}

/* ── Tab switching (shared) ──────────────────────────────── */
function activateTab(tabId) {
  document.querySelectorAll('.indicator-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector('.indicator-tab[data-tab="' + tabId + '"]');
  if (btn) btn.classList.add('active');
  const panel = document.getElementById('tab-' + tabId);
  if (panel) panel.classList.add('active');
}

/* ── On page load: read URL params ───────────────────────── */
function handleDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab) {
    activateTab(tab);
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }
}

/* ── Scroll-shrink institutional bar ─────────────────────── */
function initScrollShrink() {
  const bar = document.querySelector('.inst-bar');
  if (!bar) return;
  let compact = false;
  window.addEventListener('scroll', () => {
    const shouldCompact = window.scrollY > 60;
    if (shouldCompact !== compact) {
      compact = shouldCompact;
      bar.classList.toggle('inst-bar--compact', compact);
    }
  }, { passive: true });
}

/* ── Tab click binding ───────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.indicator-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.tab);
      const bar = document.querySelector('.indicator-bar');
      if (bar) window.scrollTo({ top: bar.offsetTop - 56, behavior: 'smooth' });
    });
  });
}

/* ── Accordion binding ───────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Keyboard shortcuts ──────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollShrink();
  initTabs();
  initAccordions();
  handleDeepLink();

  const input = document.querySelector('.search-input');
  if (input) input.addEventListener('input', e => renderResults(e.target.value));
});
