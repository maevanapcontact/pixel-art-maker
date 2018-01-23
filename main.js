// Operations when the DOM is ready
$(function() {
  // Variables DOM
  const WORKSPACE_SELECT = $('#workspaces-select');
  const CREATE_GRID_BTN = $('#create-grid-btn');
  const CREATE_CANVAS_FORM = $('#create-canvas-form');
  const CANVAS_TABLE = $('#canvas-table');
  const CREATE_GRID_POPUP = $('#create-grid-popup');
  const WIDTH_INPUT = $('#width-input');
  const HEIGHT_INPUT = $('#height-input');
  const BG_COLOR_GRID = $('#bg-color-grid');

  // Variables to create grid
  let widthCanvas = WIDTH_INPUT.val();
  let heightCanvas = HEIGHT_INPUT.val();

  // Open Build Grid Popup
  CREATE_GRID_BTN.click(function() {
    CREATE_GRID_BTN.addClass('hidden');
    CREATE_GRID_POPUP.removeClass('hidden');
  });

  // Workspace choice
  $(WORKSPACE_SELECT).change(function() {
    changeWorkspace();
  });

  function changeWorkspace() {
    let elementSelected = $('#workspaces-select option:selected');

    const TOOLS_BAR = $('#tools-bar');
    const MAIN_TOOLS = $('#main-tools');
    const TOOLS_BAR_ITEM_1 = $('#tools-bar-item-1');
    const TOOLS_BAR_ITEM_2 = $('#tools-bar-item-2');
    const TOOLS_BAR_ITEM_3 = $('#tools-bar-item-3');
    const ZOOM_FORM = $('#zoom-form');
    const TOOLS_BAR_INSIDE = $('#tools-bar-inside');
    const FA_PLUS_TOOL = $('#tools-bar-item-1 .fa-plus');
    const FA_MINUS_TOOL = $('#tools-bar-item-1 .fa-minus');
    const ITEMS_ESSENTIALS_WS = $('#items-essential-ws');
    const MAIN_TITLE = $('#main-title');
    const ICON_CLICK_UNDO = $('#icon-click-undo');
    const ICON_CLICK_REDO = $('#icon-click-redo');

    /* Reset the workspace */
    TOOLS_BAR.removeClass('left-ws');
    MAIN_TOOLS.removeClass('left-ws');
    TOOLS_BAR_ITEM_1.removeClass('left-ws');
    TOOLS_BAR_ITEM_2.removeClass('left-ws');
    TOOLS_BAR_ITEM_3.removeClass('left-ws');
    ZOOM_FORM.removeClass('zoom-form-left-ws');
    TOOLS_BAR_INSIDE.removeClass('left-ws');
    FA_PLUS_TOOL.removeClass('hidden');
    FA_MINUS_TOOL.removeClass('hidden');
    ITEMS_ESSENTIALS_WS.addClass('hidden');
    MAIN_TITLE.removeClass('hidden');
    ICON_CLICK_UNDO.removeClass('hidden');
    ICON_CLICK_REDO.removeClass('hidden');
    TOOLS_BAR.removeClass('hidden');

    switch(elementSelected.attr('value')) {
      case 'default':
      break;
      case 'left':
        TOOLS_BAR.addClass('left-ws');
        MAIN_TOOLS.addClass('left-ws');
        TOOLS_BAR_ITEM_1.addClass('left-ws');
        TOOLS_BAR_ITEM_2.addClass('left-ws');
        TOOLS_BAR_ITEM_3.addClass('left-ws');
        ZOOM_FORM.addClass('zoom-form-left-ws');
        TOOLS_BAR_INSIDE.addClass('left-ws');
        FA_PLUS_TOOL.addClass('hidden');
        FA_MINUS_TOOL.addClass('hidden');
      break;
      case 'essentials':
        ITEMS_ESSENTIALS_WS.removeClass('hidden');
        MAIN_TITLE.addClass('hidden');
        ICON_CLICK_UNDO.addClass('hidden');
        ICON_CLICK_REDO.addClass('hidden');
        TOOLS_BAR.addClass('hidden');
      break;
    }
  }

  // Change the predifined size
  CREATE_CANVAS_FORM.change(function() {
    changePredifinedSize();
  });

  function changePredifinedSize() {
    let elementSelected = $('#create-canvas-form option:selected');

    switch(elementSelected.attr('value')) {
      case '8':
        heightCanvas = 8;
        widthCanvas = 8;
        HEIGHT_INPUT.attr('value', '8');
        WIDTH_INPUT.attr('value', '8');
      break;
      case '16':
        heightCanvas = 16;
        widthCanvas = 16;
        HEIGHT_INPUT.attr('value', '16');
        WIDTH_INPUT.attr('value', '16');
      break;
      case '32':
        heightCanvas = 32;
        widthCanvas = 32;
        HEIGHT_INPUT.attr('value', '32');
        WIDTH_INPUT.attr('value', '32');
      break;
      case '64':
        heightCanvas = 64;
        widthCanvas = 64;
        HEIGHT_INPUT.attr('value', '64');
        WIDTH_INPUT.attr('value', '64');
      break;
    }
  }

  // Build the Grid
  CREATE_CANVAS_FORM.submit(function(event) {
    event.preventDefault();
    CREATE_GRID_POPUP.addClass('hidden');
    CANVAS_TABLE.removeClass('hidden');
    makeGrid();
    CANVAS_TABLE.css('background-color', BG_COLOR_GRID.val());
  });

  function makeGrid() {
    heightCanvas = HEIGHT_INPUT.val();
    widthCanvas = WIDTH_INPUT.val();
    for (let i = 0; i < heightCanvas; i++) {
      CANVAS_TABLE.append('<tr></tr>');
      for (let j = 0; j < widthCanvas; j++) {
        $('tr').last().append('<td></td>');
      }
    }
  }
});
