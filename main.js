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
  const MAIN_MENU_BTN = $('#main-menu-btn');
  const MAIN_MENU = $('#main-menu');
  const SETTINGS_POPUP = $('#settings-popup');
  const MAIN_MENU_LIST = $('#main-menu-list');
  const SETTINGS_GRID_COLOR = $('#settigs-grid-color');
  const SETTINGS_CELL_SIZE = $('#settings-cell-size');
  const SETTINGS_SAVE = $('#settings-save');
  const MAIN_MENU_SET = $('#main-menu-set');
  const PALETTE_BTN = $('#palette-btn');
  const COLOR_PALETTE_MENU = $('#color-palette-menu');
  const COLOR_ITEM_1 = $('#color-item-1');
  const COLOR_ITEM_2 = $('#color-item-2');
  const COLOR_ITEM_3 = $('#color-item-3');
  const COLOR_ITEM_4 = $('#color-item-4');
  const ITEMS_ESSENTIALS_WS = $('#items-essential-ws');
  const LAYER_BTN = $('#layer-btn');
  const LAYER_POPUP = $('#layer-popup');

  // Variables to create grid
  let widthCanvas = WIDTH_INPUT.val();
  let heightCanvas = HEIGHT_INPUT.val();

  // Variables for tools
  let mouseState = false;

  // Open main menu
  MAIN_MENU_BTN.click(function() {
    MAIN_MENU.toggleClass('hidden');
    if (MAIN_MENU_LIST.hasClass('hidden')) {
      MAIN_MENU_LIST.removeClass('hidden')
      SETTINGS_POPUP.addClass('hidden');
    }
  });

  // Open "New" On main menu
  MAIN_MENU.click(function(event) {
    let elementClicked = event.target;

    switch(elementClicked.className) {
      case 'main-menu-new':
        if (!CREATE_GRID_BTN.hasClass('hidden')) {
          CREATE_GRID_BTN.addClass('hidden');
        }
        if (!CANVAS_TABLE.hasClass('hidden')) {
          CANVAS_TABLE.addClass('hidden');
        }
        CREATE_GRID_POPUP.removeClass('hidden');
        MAIN_MENU.addClass('hidden');
      break;
      case 'main-menu-open':
        MAIN_MENU.addClass('hidden');
      break;
      case 'main-menu-save':
        MAIN_MENU.addClass('hidden');
      break;
      case 'main-menu-dl':
        MAIN_MENU.addClass('hidden');
      break;
      case 'main-menu-set':
        MAIN_MENU_LIST.addClass('hidden');
        SETTINGS_POPUP.removeClass('hidden');
      break;
      case 'main-menu-close':
        location.reload();
      break;
    }
  });

  // Change color grid itself
  SETTINGS_GRID_COLOR.change(function() {
    $('.canvas-table td').css('border-color', SETTINGS_GRID_COLOR.val());
  });

  // Change cells size
  SETTINGS_SAVE.click(function() {
    MAIN_MENU.addClass('hidden');
    SETTINGS_POPUP.addClass('hidden');
    MAIN_MENU_LIST.removeClass('hidden');
    $('.canvas-table td').css('width', SETTINGS_CELL_SIZE.val() + 'px');
    $('.canvas-table td').css('height', SETTINGS_CELL_SIZE.val() + 'px');
  });

  // Open Build Grid Popup
  CREATE_GRID_BTN.click(function() {
    CREATE_GRID_BTN.addClass('hidden');
    CREATE_GRID_POPUP.removeClass('hidden');
  });

  // Open palette popup
  PALETTE_BTN.click(function() {
    COLOR_PALETTE_MENU.toggleClass('hidden');
  });

  // Change preset colors
  COLOR_PALETTE_MENU.click(function(event) {
    let elementClicked = event.target;

    switch (elementClicked.className) {
      case 'palette-1':
        COLOR_ITEM_1.css('background-color', '#cda450');
        COLOR_ITEM_2.css('background-color', '#e9e9dc');
        COLOR_ITEM_3.css('background-color', '#646c49');
        COLOR_ITEM_4.css('background-color', '#393f28');
        COLOR_PALETTE_MENU.addClass('hidden');
      break;
      case 'palette-2':
        COLOR_ITEM_1.css('background-color', '#955e60');
        COLOR_ITEM_2.css('background-color', '#646f62');
        COLOR_ITEM_3.css('background-color', '#b2463d');
        COLOR_ITEM_4.css('background-color', '#3d3d3d');
        COLOR_PALETTE_MENU.addClass('hidden');
      break;
      case 'palette-3':
        COLOR_ITEM_1.css('background-color', '#6b7c8f');
        COLOR_ITEM_2.css('background-color', '#f7892f');
        COLOR_ITEM_3.css('background-color', '#fac231');
        COLOR_ITEM_4.css('background-color', '#dcc8aa');
        COLOR_PALETTE_MENU.addClass('hidden');
      break;
      case 'palette-4':
        COLOR_ITEM_1.css('background-color', '#2c6da9');
        COLOR_ITEM_2.css('background-color', '#cf5261');
        COLOR_ITEM_3.css('background-color', '#b57d4e');
        COLOR_ITEM_4.css('background-color', '#45859b');
        COLOR_PALETTE_MENU.addClass('hidden');
      break;
      case 'palette-5':
        COLOR_ITEM_1.css('background-color', '#e47122');
        COLOR_ITEM_2.css('background-color', '#09899e');
        COLOR_ITEM_3.css('background-color', '#64babf');
        COLOR_ITEM_4.css('background-color', '#f1aa7e');
        COLOR_PALETTE_MENU.addClass('hidden');
      break;
    }
  });

  // Open / Close layer button
  LAYER_BTN.click(function() {
    LAYER_POPUP.toggleClass('hidden');
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
        HEIGHT_INPUT.val('8');
        WIDTH_INPUT.val('8');
      break;
      case '16':
        heightCanvas = 16;
        widthCanvas = 16;
        HEIGHT_INPUT.val('16');
        WIDTH_INPUT.val('16');
      break;
      case '32':
        heightCanvas = 32;
        widthCanvas = 32;
        HEIGHT_INPUT.val('32');
        WIDTH_INPUT.val('32');
      break;
      case '64':
        heightCanvas = 64;
        widthCanvas = 64;
        HEIGHT_INPUT.val('64');
        WIDTH_INPUT.val('64');
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
    removeGrid();

    heightCanvas = HEIGHT_INPUT.val();
    widthCanvas = WIDTH_INPUT.val();

    for (let i = 0; i < heightCanvas; i++) {
      CANVAS_TABLE.append('<tr></tr>');
      for (let j = 0; j < widthCanvas; j++) {
        $('tr').last().append('<td class="cell-click"></td>');
      }
    }

    MAIN_MENU_SET.removeClass('disabled-text');
  }

  // Remove the grid
  function removeGrid() {
    while ($('tr').length) {
      $('tr').remove();
    }
  }

  // Check the state of the cursor
  $(document).mousedown(function(event) {
    mouseState = true;
  });

  $(document).mouseup(function(event) {
    mouseState = false;
  });

  // Use tools on the grid
  $(document).on('click', '#canvas-table td', function() {
    $(this).css('background-color', 'red');
  });

  $(document).on('mouseenter', '#canvas-table td', function() {
    if (mouseState) {
      $(this).css('background-color', 'red');
    } else {

    }
  });
});
