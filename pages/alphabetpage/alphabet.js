function generate_alphabet() {
  console.log("Generating alphabet table")
  const table = document.getElementById('alphabet') || (document.body.appendChild(Object.assign(document.createElement('table'), {id:'alphabet'})), document.getElementById('alphabet'));

  let sound;
  // generate table
  function chunk(data, size = 6) {
    const filtered = data.filter(e => {
      if (!e) return false;
      if (!e.properties) return true;
      return !(
        (Array.isArray(e.properties) && e.properties.includes(window.REG.SHEET_IGNORE)) ||
        (!Array.isArray(e.properties) && e.properties[window.REG.SHEET_IGNORE])
      );
    });
    const chunks = [];
    for (let i = 0; i < filtered.length; i += size) {
      chunks.push(filtered.slice(i, i + size));
    }
    return chunks;
  }

  const rows = chunk(window.alphabetMap, 6);

  rows.forEach(row => {
    const trNames = document.createElement('tr');
    const trGlyphs = document.createElement('tr');

    row.forEach(entry => {
      const tdName = document.createElement('td');
      tdName.textContent = entry.properties.includes(window.REG.DIFFERENT)
        ? `${entry.name}`
        : `${entry.letter} - ${entry.name}`;

      const tdGlyph = document.createElement('td');
      tdGlyph.classList.add('glyph');

      const span = document.createElement('span');
      span.textContent = entry.letter_glyph || '';
      span.style.display = 'inline-block';
      span.style.transformOrigin = 'center center';

      tdName.addEventListener('click', () => openModal(entry));
      tdGlyph.addEventListener('click', () => openModal(entry));

      tdGlyph.appendChild(span);
      trNames.appendChild(tdName);
      trGlyphs.appendChild(tdGlyph);

      setTimeout(() => {
        const scaleExtra = entry.table_prop?.size || 1;
        const xOffset = entry.table_prop?.xoffset || 0;
        const yOffset = entry.table_prop?.yoffset || 0;
        span.style.transform = `scale(${scaleExtra}) translateX(${xOffset}px) translateY(${yOffset}px)`;
      });
    });

    table.appendChild(trNames);
    table.appendChild(trGlyphs);
  });

  let audio;
  function playSound() { // when playsound button hit
    audio = new Audio(sound);
    if (audio.pause) {
      audio.play(); //play sound
    }
  }

  function closeModal() { //when closed
    modal.style.display="none"; // hide modal
  }

  const modal = document.getElementById('modal') || (() => {
      const m = document.createElement('div');
      m.id = 'modal';
      m.className = 'modalWrap';
      m.innerHTML = `
        <div class="modalContent">
          <button class="modalClose">&times;</button>
          <div class="horisontalAlign">
            <p id="modalGlyph" class="glyph"></p>
            <div class="verticalAlign">
              <p id="modalLabel">Label.</p>
              <p id="modalText">Placeholder text for this grid square.</p>
              <button id="modalSound">Play Sound</button>
            </div>
          </div>
          <table id="allophoneTable"></table>
        </div>`;
      document.body.appendChild(m);
      return m;
  })();

  const closeBtn = modal.querySelector('.modalClose');
  closeBtn.onclick = () => closeModal();

  const playBtn = modal.querySelector('#modalSound');
  playBtn.onclick = () => playSound();

  const modalGlyph = document.getElementById('modalGlyph');
  const modalText = document.getElementById('modalText');
  const allophoneTable = document.getElementById('allophoneTable');
  const modalLabel = document.getElementById('modalLabel');

  //modal function with the number from the buttons
  function openModal(entry) {
    if (entry.text === "") return;
    modalLabel.textContent = entry.name;
    modalText.textContent = description(entry);
    modalGlyph.textContent = entry.letter_glyph;
    sound = entry.sound;

    playBtn.style.display = entry.properties.includes(window.REG.DIFFERENT)
      ? "none"
      : "block";

    // Allophones
    allophoneTable.innerHTML = "";
    if (entry.allophones && Object.keys(entry.allophones).length > 0) {
      allophoneTable.style.display = "table";

      const header = document.createElement("tr");
      ["Allophone", "Condition"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        header.appendChild(th);
      });
      allophoneTable.appendChild(header);

      for (const symbol in entry.allophones) {
        const tr = document.createElement("tr");
        const tdSymbol = document.createElement("td");
        tdSymbol.textContent = symbol;
        const tdCond = document.createElement("td");
        tdCond.textContent = entry.allophones[symbol];
        tr.appendChild(tdSymbol);
        tr.appendChild(tdCond);
        allophoneTable.appendChild(tr);
      }
    } else {
      allophoneTable.style.display = "none";
    }

    modal.style.display = "flex";
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  console.log("Generated alphabet table");
  
  console.log(modal);
  console.log(table);

  openModal();
}

functions.generate_alphabet = generate_alphabet;