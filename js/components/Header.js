function Header(item, color) {
    return `
        <div style="background: ${color}" class="col kanban_board_title"><p>${item}</p></div>
  `;
}