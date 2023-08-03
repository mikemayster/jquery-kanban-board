(function($) {
    $.fn.kanban = function(options) {
        // Default settings
        const $this = $(this);
        const defaultSettings = {
            titles: [],
            colours: [],
            items: [],
            onChange: function(e, ui) {},
            onReceive: function(e, ui) {
                const id = ui.item.attr('data-id');
                const block = ui.item.parent().attr('data-block');

                const pos = settings.items.findIndex(el => el.id === Number(id));
                if (pos >= 0){
                    settings.items[pos].block = block;
                }

                console.log("Updating status with id: " +id+" on block: "+block);
            }
        };

        settings = $.extend({}, defaultSettings, options);

        // Classes used for styling
        const classes = {
            kanban_board_titles: "kanban_board_titles",
            kanban_board_title: "kanban_board_title",
            kanban_board_blocks: "kanban_board_blocks",
            kanban_board_block: "kanban_board_block",
            kanban_board_item_placeholder: "kanban_board_block_item_placeholder",
            kanban_board_footers : "kanban_board_footers",
            kanban_board_footer : "kanban_board_footer"
        };

        buildKanban(settings, $this, classes);

    }
}(jQuery));

function buildKanban(settings, $this, classes) {

    $this.append('<div class="row '+classes.kanban_board_titles+'"></div>');
    $this.append('<div class="row '+classes.kanban_board_blocks+'"></div>');
    $this.append('<div class="row '+classes.kanban_board_footers+'"></div>');

    buildModal();
    buildHeader(settings, $this, classes);
    buildBlocks(settings, $this, classes);
    buildFooter(settings, $this, classes);
    buildCards(settings, $this, classes);
}
function buildHeader(settings, $this, classes) {
    settings.titles.forEach(function(item, index) {
        const titleHtml = '<div style="background: '+settings.colours[index]+'" class="col ' + classes.kanban_board_title + '"><p>' + item + '</p></div>';

        $this.find('.'+classes.kanban_board_titles).append(titleHtml);
    });
}

function buildBlocks(settings, $this, classes) {
    settings.titles.forEach(function(item) {
        const blockHtml = '<div class="col ' + classes.kanban_board_block + '" data-block="'+item+'"></div>';
        $this.find('.'+classes.kanban_board_blocks).append(blockHtml);
    });

    $("."+classes.kanban_board_block).sortable({
        connectWith: "."+classes.kanban_board_block,
        containment: "."+classes.kanban_board_blocks,
        placeholder: classes.kanban_board_item_placeholder,
        scroll: true,
        cursor: "move",
        change: settings.onChange,
        receive: settings.onReceive
    }).disableSelection();
}

function buildFooter(settings, $this, classes) {
    settings.titles.forEach(function(item, index) {
        const addButton = '<div class="col ' + classes.kanban_board_footer + '" data-block="'+item+'"><button type="button" id="addButton" onclick="openModal(\''+ item +'\')" style="width: inherit" class="btn btn-outline-dark">Add Item</button></div>';
        $this.find('.'+classes.kanban_board_footers).append(addButton);
    });
}
function buildCards(settings, $this, classes) {
    settings.items.forEach(function(item) {
        const block = $this.find('.'+classes.kanban_board_block+'[data-block="'+item.block+'"]');
        const itemHtml = Card(item);
        block.append(itemHtml);
    });
}

function openModal(itemName){
    $('#blockName').val(itemName);
    $('#modalAddItem').modal('show')
}

function addItem(){
    const blockName = $("#blockName").val();
    const block = $('.kanban_board_block[data-block="'+blockName+'"]');

    const item = prepareItem(blockName);

    const itemHtml = Card(item);
    block.append(itemHtml);

    settings.items.push(item)

    closeModal();
    console.log("Added card with id: " + item.id);
}

function deleteCard(id, itemBlock){
    const block = $('.kanban_board_block[data-block="'+itemBlock+'"]');
    const card = block.find('.card[data-id="'+id+'"]');
    if(card.length){
        card.remove();

        const pos = settings.items.findIndex(el => el.id === id);
        if (pos >= 0){
            settings.items.splice(pos, 1);
        }
    }

    console.log("Deleted card with id: " +id);
}

function prepareItem(blockName){
    const title = $("#title").val();
    const content = $("#content").val();
    const footer = $("#footer").val();

    const lastItemIdx = settings.items[settings.items.length - 1].id;

    return {
        "id": lastItemIdx + 1,
        "title": title,
        "content": content,
        "block" : blockName,
        "footer": footer
    }
}

function closeModal(){
    $("#title").val("");
    $("#content").val("");
    $("#footer").val("");

    $('#modalAddItem').modal('hide')
}

function buildModal(){
    $('#modal').append(ModalAddItem())
}