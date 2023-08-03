function ModalAddItem() {
    return `
    <div class="modal fade" id="modalAddItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<input class="form-control" id="blockName" type="hidden">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Add Item</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="mb-3">
					<label for="title" class="form-label">Title</label>
					<input class="form-control" id="title">
				</div>
				<div class="mb-3">
					<label for="content" class="form-label">Content</label>
					<textarea class="form-control" id="content" rows="3"></textarea>
				</div>
				<div class="mb-3">
					<label for="footer" class="form-label">Footer</label>
					<input class="form-control" id="footer">
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" onclick="addItem()">Add Item</button>
			</div>
		</div>
	</div>
</div>
  `;
}