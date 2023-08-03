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

        buildKanban(settings, $this);

    }
}(jQuery));

function buildKanban(settings, $this) {

    $this.append('<div class="row kanban_board_titles"></div>');
    $this.append('<div class="row kanban_board_blocks"></div>');
    $this.append('<div class="row kanban_board_footers"></div>');

    buildModal();
    buildHeader(settings, $this);
    buildBlocks(settings, $this);
    buildFooter(settings, $this);
    buildCards(settings);
}
function buildHeader(settings, $this) {
    settings.titles.forEach(function(item, index) {
        $this.find('.kanban_board_titles').append(Header(item, settings.colours[index]));
    });
}

function buildBlocks(settings, $this) {
    settings.titles.forEach(function(item) {
        $this.find('.kanban_board_blocks').append(Block(item));
    });

    initializeSortable();
}

function buildFooter(settings, $this) {
    settings.titles.forEach(function(item, index) {
        $this.find('.kanban_board_footers').append(Footer(item));
    });
}
function buildCards(settings) {
    settings.items.forEach(function(item) {
        const block = findBlock(item.block);
        block.append(Card(item));
    });
}

function openModal(itemName){
    $('#blockName').val(itemName);
    $('#modalAddItem').modal('show')
}

function addItem(){
    const blockName = $("#blockName").val();
    const block = findBlock(blockName);

    const item = prepareItem(blockName);

    block.append(Card(item));

    settings.items.push(item)

    closeModal();
    console.log("Added card with id: " + item.id);
}

function deleteCard(id, itemBlock){
    const block = findBlock(itemBlock);
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

function findBlock(item){
    return $('.kanban_board_block[data-block="'+item+'"]');
}

function initializeSortable(){
    $(".kanban_board_block").sortable({
        connectWith: ".kanban_board_block",
        containment: ".kanban_board_blocks",
        placeholder: "kanban_board_block_item_placeholder",
        scroll: true,
        cursor: "move",
        change: settings.onChange,
        receive: settings.onReceive
    }).disableSelection();
}