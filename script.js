// Your code here.
<script>
  const itemsContainer = document.querySelector('.items');
  const items = document.querySelectorAll('.item');
  let selected = null;
  let offsetX = 0;
  let offsetY = 0;

  // Make each item draggable
  items.forEach(item => {
    item.style.position = 'absolute';
    item.style.cursor = 'grab';

    item.addEventListener('mousedown', (e) => {
      selected = item;

      // Calculate offset
      const rect = selected.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Bring selected item to front
      selected.style.zIndex = 1000;
      selected.style.cursor = 'grabbing';

      // Disable transition during drag
      selected.style.transition = 'none';
    });
  });

  // Handle mouse move
  document.addEventListener('mousemove', (e) => {
    if (!selected) return;

    const containerRect = itemsContainer.getBoundingClientRect();

    // Calculate new position
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Clamp within container bounds
    const maxX = containerRect.width - selected.offsetWidth;
    const maxY = containerRect.height - selected.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    selected.style.left = `${x}px`;
    selected.style.top = `${y}px`;
  });

  // Handle mouse release
  document.addEventListener('mouseup', () => {
    if (selected) {
      selected.style.cursor = 'grab';
      selected.style.zIndex = 1;
      selected = null;
    }
  });

  // Set initial position for grid layout
  function arrangeInGrid() {
    const columns = 5;
    const gap = 20;
    const itemWidth = 200;
    const itemHeight = 200;
    items.forEach((item, i) => {
      const row = Math.floor(i / columns);
      const col = i % columns;
      item.style.left = `${col * (itemWidth + gap)}px`;
      item.style.top = `${row * (itemHeight + gap)}px`;
    });
  }

  arrangeInGrid();
</script>

