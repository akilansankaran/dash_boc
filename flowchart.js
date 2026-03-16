(function () {
  var TREE = {
    id: 'root', label: 'Immigration Policy Analysis', color: 'base',
    children: [
      {
        id: 'us', label: 'United States', color: 'blue', link: 'us.html',
        children: [
          { id: 'us-flows',  label: 'Admission Flows',  color: 'blue', link: 'us.html?tab=us-flows' },
          { id: 'us-visa',   label: 'Visa Categories',  color: 'blue', link: 'us.html?tab=us-visa' },
          { id: 'us-econ',   label: 'Economic Impact',  color: 'blue', link: 'us.html?tab=us-econ' },
          { id: 'us-geo',    label: 'Geography',         color: 'blue', link: 'us.html?tab=us-geo' },
          { id: 'us-policy', label: 'Policy Timeline',  color: 'blue', link: 'us.html?tab=us-policy' }
        ]
      },
      {
        id: 'cmp', label: 'Cross-Comparison', color: 'teal', link: 'comparison.html',
        children: [
          { id: 'cmp-flows', label: 'Admission Flows', color: 'teal', link: 'comparison.html?tab=flows' },
          { id: 'cmp-labor', label: 'Labor Market',    color: 'teal', link: 'comparison.html?tab=labor' },
          { id: 'cmp-fiscal',label: 'Fiscal Impact',   color: 'teal', link: 'comparison.html?tab=fiscal' },
          { id: 'cmp-demo',  label: 'Demography',      color: 'teal', link: 'comparison.html?tab=demography' },
          { id: 'cmp-policy',label: 'Policy',          color: 'teal', link: 'comparison.html?tab=policy' }
        ]
      },
      {
        id: 'ca', label: 'Canada', color: 'red', link: 'canada.html',
        children: [
          { id: 'ca-flows', label: 'Admission Flows',     color: 'red', link: 'canada.html?tab=ca-flows' },
          { id: 'ca-ee',    label: 'Express Entry',        color: 'red', link: 'canada.html?tab=ca-ee' },
          { id: 'ca-econ',  label: 'Econ. Integration',    color: 'red', link: 'canada.html?tab=ca-econ' },
          { id: 'ca-prov',  label: 'Provincial Data',      color: 'red', link: 'canada.html?tab=ca-prov' },
          { id: 'ca-demo',  label: 'Demographics',         color: 'red', link: 'canada.html?tab=ca-demo' }
        ]
      }
    ]
  };

  var COLORS = {
    base: { stroke: '#eab308', fill: 'rgba(234,179,8,.10)', hover: '#fde047' },
    blue: { stroke: '#3b82f6', fill: 'rgba(59,130,246,.10)', hover: '#93c5fd' },
    teal: { stroke: '#14b8a6', fill: 'rgba(20,184,166,.10)', hover: '#5eead4' },
    red:  { stroke: '#ef4444', fill: 'rgba(239,68,68,.10)',  hover: '#fca5a5' }
  };

  var NODE_PAD   = 32;
  var PROXIMITY  = 80;
  var ANIM_MS    = 400;

  var ROOT_FONT  = 18;
  var ROOT_H     = 48;
  var L1_FONT    = 16;
  var L1_H       = 44;
  var L2_FONT    = 13;
  var L2_H       = 36;

  var ROW_GAP_01 = 75;
  var ROW_GAP_12 = 65;
  var COL_GAP    = 14;

  var expanded   = null;

  function mw(label, fontSize) {
    return label.length * fontSize * 0.56 + NODE_PAD;
  }

  function build() {
    var canvas = document.getElementById('flowchart-canvas');
    if (!canvas) return;

    canvas.innerHTML = '';

    var W = Math.max(canvas.clientWidth, 700);

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.style.display = 'block';
    svg.style.width = '100%';
    svg.style.overflow = 'visible';
    canvas.appendChild(svg);

    var rootW = mw(TREE.label, ROOT_FONT);
    var rootX = W / 2;
    var rootY = ROOT_H / 2 + 20;

    var countries = TREE.children;
    var l1Spacing = W / (countries.length + 1);

    var allEls = {};

    function makeCurve(x1, y1, x2, y2) {
      var my = (y1 + y2) / 2;
      return 'M' + x1 + ',' + y1 + ' C' + x1 + ',' + my + ' ' + x2 + ',' + my + ' ' + x2 + ',' + y2;
    }

    function makeNode(id, label, color, x, y, w, h, fontSize, isExpandable) {
      var g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'fc-node fc-color-' + color);
      g.dataset.id = id;

      var rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x - w / 2);
      rect.setAttribute('y', y - h / 2);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('rx', 8);
      rect.setAttribute('fill', COLORS[color].fill);
      rect.setAttribute('stroke', COLORS[color].stroke);
      rect.setAttribute('stroke-width', '1.5');
      g.appendChild(rect);

      var text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y + fontSize * 0.35);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', fontSize);
      text.setAttribute('font-weight', '600');
      text.textContent = label;
      g.appendChild(text);

      if (isExpandable) {
        var chevron = document.createElementNS(svgNS, 'text');
        chevron.setAttribute('x', x + w / 2 - 14);
        chevron.setAttribute('y', y + 4);
        chevron.setAttribute('text-anchor', 'middle');
        chevron.setAttribute('font-size', '10');
        chevron.setAttribute('class', 'fc-chevron');
        chevron.textContent = '▾';
        g.appendChild(chevron);
      }

      g.style.cursor = 'pointer';
      return g;
    }

    function makeEdge(x1, y1, x2, y2, color, idx, fromId, toId) {
      var path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', makeCurve(x1, y1, x2, y2));
      path.setAttribute('class', 'fc-edge');
      path.dataset.idx = idx;
      path.dataset.color = color;
      path.dataset.from = fromId;
      path.dataset.to = toId;
      return path;
    }

    var edgeGroup = document.createElementNS(svgNS, 'g');
    edgeGroup.setAttribute('class', 'fc-edges');
    svg.appendChild(edgeGroup);

    var nodeGroup = document.createElementNS(svgNS, 'g');
    nodeGroup.setAttribute('class', 'fc-nodes');
    svg.appendChild(nodeGroup);

    var rootEl = makeNode(TREE.id, TREE.label, TREE.color, rootX, rootY, rootW, ROOT_H, ROOT_FONT, false);
    nodeGroup.appendChild(rootEl);
    allEls[TREE.id] = { el: rootEl, x: rootX, y: rootY, w: rootW, h: ROOT_H };

    var edgeIdx = 0;
    var countryData = [];

    countries.forEach(function (country, ci) {
      var cx = l1Spacing * (ci + 1);
      var cy = rootY + ROW_GAP_01;
      var cw = mw(country.label, L1_FONT);

      var rootEdge = makeEdge(rootX, rootY + ROOT_H / 2, cx, cy - L1_H / 2, country.color, edgeIdx++, TREE.id, country.id);
      edgeGroup.appendChild(rootEdge);

      var countryEl = makeNode(country.id, country.label, country.color, cx, cy, cw, L1_H, L1_FONT, true);
      nodeGroup.appendChild(countryEl);
      allEls[country.id] = { el: countryEl, x: cx, y: cy, w: cw, h: L1_H };

      var cd = {
        id: country.id,
        cx: cx,
        cy: cy,
        color: country.color,
        link: country.link,
        el: countryEl,
        rootEdge: rootEdge,
        childEls: [],
        childEdges: [],
        children: country.children || []
      };

      if (country.children) {
        var childWidths = country.children.map(function (c) { return mw(c.label, L2_FONT); });
        var totalChildW = 0;
        childWidths.forEach(function (w) { totalChildW += w; });
        totalChildW += (country.children.length - 1) * COL_GAP;
        var startX = cx - totalChildW / 2;
        var childY = cy + ROW_GAP_12;
        var runX = startX;

        country.children.forEach(function (child, i) {
          var cw2 = childWidths[i];
          var childCx = runX + cw2 / 2;
          runX += cw2 + COL_GAP;

          var childEdge = makeEdge(cx, cy + L1_H / 2, childCx, childY - L2_H / 2, child.color, edgeIdx++, country.id, child.id);
          childEdge.style.opacity = '0';
          childEdge.style.transition = 'opacity ' + ANIM_MS + 'ms ease';
          edgeGroup.appendChild(childEdge);

          var childEl = makeNode(child.id, child.label, child.color, childCx, childY, cw2, L2_H, L2_FONT, false);
          childEl.style.opacity = '0';
          childEl.style.transform = 'translateY(-16px)';
          childEl.style.transition = 'opacity ' + ANIM_MS + 'ms ease, transform ' + ANIM_MS + 'ms ease';
          childEl.style.pointerEvents = 'none';
          nodeGroup.appendChild(childEl);

          allEls[child.id] = { el: childEl, x: childCx, y: childY, w: cw2, h: L2_H };

          cd.childEls.push(childEl);
          cd.childEdges.push(childEdge);

          childEl.addEventListener('click', function (e) {
            e.stopPropagation();
            if (child.link) window.location.href = child.link;
          });
        });
      }

      countryData.push(cd);
    });

    var collapsedH = rootY + ROW_GAP_01 + L1_H / 2 + 40;
    var expandedH  = rootY + ROW_GAP_01 + ROW_GAP_12 + L2_H / 2 + 40;

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + collapsedH);
    svg.setAttribute('height', collapsedH);
    canvas.style.transition = 'min-height ' + ANIM_MS + 'ms ease';
    canvas.style.minHeight = collapsedH + 'px';

    function toggleExpand(cd) {
      var isExpanding = (expanded !== cd.id);

      countryData.forEach(function (d) {
        var show = (isExpanding && d.id === cd.id);
        var chevron = d.el.querySelector('.fc-chevron');

        d.childEls.forEach(function (el, i) {
          if (show) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transitionDelay = (i * 40) + 'ms';
            el.style.pointerEvents = 'auto';
          } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(-16px)';
            el.style.transitionDelay = '0ms';
            el.style.pointerEvents = 'none';
          }
        });
        d.childEdges.forEach(function (edge, i) {
          if (show) {
            edge.style.opacity = '1';
            edge.style.transitionDelay = (i * 40) + 'ms';
          } else {
            edge.style.opacity = '0';
            edge.style.transitionDelay = '0ms';
          }
        });

        if (chevron) {
          chevron.textContent = show ? '▴' : '▾';
        }
      });

      if (isExpanding) {
        expanded = cd.id;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + expandedH);
        svg.setAttribute('height', expandedH);
        canvas.style.minHeight = expandedH + 'px';
      } else {
        expanded = null;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + collapsedH);
        svg.setAttribute('height', collapsedH);
        canvas.style.minHeight = collapsedH + 'px';
      }
    }

    countryData.forEach(function (cd) {
      cd.el.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleExpand(cd);
      });
    });

    var activeNode = null;
    var allNodes = [];
    Object.keys(allEls).forEach(function (id) {
      allNodes.push({ id: id, x: allEls[id].x, y: allEls[id].y });
    });

    svg.addEventListener('mousemove', function (evt) {
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      var ctm = svg.getScreenCTM();
      if (!ctm) return;
      var svgPt = pt.matrixTransform(ctm.inverse());

      var closest = null, closestDist = Infinity;
      allNodes.forEach(function (n) {
        var el = allEls[n.id].el;
        if (el.style.opacity === '0') return;
        var dx = svgPt.x - n.x;
        var dy = svgPt.y - n.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) { closestDist = dist; closest = n; }
      });

      var hit = (closestDist <= PROXIMITY) ? closest : null;
      if (hit && hit.id === activeNode) return;
      activeNode = hit ? hit.id : null;

      svg.querySelectorAll('.fc-node').forEach(function (g) { g.classList.remove('fc-node--active'); });
      svg.querySelectorAll('.fc-edge').forEach(function (p) {
        p.classList.remove('fc-edge--active', 'fc-stroke-teal', 'fc-stroke-blue', 'fc-stroke-red', 'fc-stroke-base');
      });

      if (!hit) return;

      var hitEl = allEls[hit.id];
      if (hitEl) hitEl.el.classList.add('fc-node--active');

      edgeGroup.querySelectorAll('.fc-edge').forEach(function (p) {
        if (p.style.opacity === '0') return;
        if (p.dataset.from === hit.id || p.dataset.to === hit.id) {
          p.classList.add('fc-edge--active', 'fc-stroke-' + p.dataset.color);
          var otherId = (p.dataset.from === hit.id) ? p.dataset.to : p.dataset.from;
          var otherEl = allEls[otherId];
          if (otherEl) otherEl.el.classList.add('fc-node--active');
        }
      });
    });

    svg.addEventListener('mouseleave', function () {
      activeNode = null;
      svg.querySelectorAll('.fc-node').forEach(function (g) { g.classList.remove('fc-node--active'); });
      svg.querySelectorAll('.fc-edge').forEach(function (p) {
        p.classList.remove('fc-edge--active', 'fc-stroke-teal', 'fc-stroke-blue', 'fc-stroke-red', 'fc-stroke-base');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
