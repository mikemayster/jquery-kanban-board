(function($) {
    $.fn.kanban = function(options) {
        // Default settings
        const $this = $(this);
        const defaultSettings = {
            titles: [],
            colours: [],
            items: [],
            onChange: function(e, ui) {},
            onReceive: function(e, ui) {}
        };
        const settings = $.extend({}, defaultSettings, options);

        // Classes used for styling
        const classes = {
            kanban_board_titles: "kanban_board_titles",
            kanban_board_title: "kanban_board_title",
            kanban_board_blocks: "kanban_board_blocks",
            kanban_board_block: "kanban_board_block",
            kanban_board_item_placeholder: "kanban_board_block_item_placeholder",
        };

        buildKanban(settings, $this, classes);
    }
}(jQuery));

function buildKanban(settings, $this, classes) {

    $this.append('<div class="row '+classes.kanban_board_titles+'"></div>');
    $this.append('<div class="row '+classes.kanban_board_blocks+'"></div>');

    buildTitles(settings, $this, classes);
    buildBlocks(settings, $this, classes);
    buildCards(settings, $this, classes);
}
function buildTitles(settings, $this, classes) {
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
function buildCards(settings, $this, classes) {
    settings.items.forEach(function(item) {
        const block = $this.find('.'+classes.kanban_board_block+'[data-block="'+item.block+'"]');
        const itemHtml = buildCard(item);
        block.append(itemHtml);
    });

    function buildCard(item){
        let itemHtml = '<div class="card" data-id="'+item.id+'">';
        itemHtml += '<div class="card-header">'+item.title+'</div>';

        itemHtml += '<div class="card-body">';
        itemHtml += '<blockquote class="blockquote mb-0">';
        itemHtml += '<p>'+item.content+'</p>';

        // if(item.link){
        //     itemHtml += '<a href="'+item.link+'">'+item.link_text+'</a>';
        // }

        if(item.footer){
            itemHtml += '<footer class="blockquote-footer">'+item.footer+'</footer>';
        }

        itemHtml += '</blockquote>';
        itemHtml += '</div>';
        itemHtml += '</div>';

        return itemHtml;
    }
}