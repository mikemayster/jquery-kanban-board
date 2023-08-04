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
			    <form role="form" id="newModalForm">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span>(required, at least 3 characters)</span></label>
                        <input class="form-control" id="title" name="title" minlength="3" type="text" required />
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">Content <span>(required)</span></label>
                        <textarea class="form-control" id="content" name="content" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="footer" class="form-label">Footer <span>(required, at least 3 characters)</span></label>
                        <input class="form-control" id="footer" name="footer" minlength="3" type="text" required />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary submit" onclick="addItem()" disabled>Add Item</button>
                    </div>
			    </form>
			</div>
		</div>
	</div>
</div>
  `;
}

$(function () {

    const $form = $("#newModalForm");

    const validator = $form.validate({
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            content: {
                required: true,
            },
            footer: {
                required: true,
                minlength: 3
            }
        }
    });

    $form.on("input", () => {
        if ($("#newModalForm").valid()) {
            $(".submit").removeAttr("disabled");
        } else {
            $(".submit").attr("disabled", "disabled");
        }
    });

    $(".cancel").click(function () {
        validator.resetForm();
        $(this).closest('form').find("input[type=text], textarea").val("");
    });

});