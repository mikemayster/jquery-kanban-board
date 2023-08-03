function Card(item) {
    return `
    <div class="card" data-id=${item.id}>
        <div class="card-header">
            <div class="row">
                <div class="col-md-10">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="col-md-2">
                    <button type="button" onclick="deleteCard(${item.id}, '${item.block}')" class="btn-close" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>${item.content}</p>
                <footer class="blockquote-footer">${item.footer}</footer>
            </blockquote>
        </div>
    </div>
  `;
}