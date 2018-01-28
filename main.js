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
  const TOOL_COLOR_GRID = $('#tool-color-grid');
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
  const BACK_COLOR = $('#back-color');
  const TOOL_COLOR = $('#tool-color');
  const MAIN_MENU_SAVE = $('#main-menu-save');
  const CONTAINER_CANVAS = $('#container-canvas');
  const MAIN_MENU_OPEN = $('#main-menu-open');
  const BACK_COLOR_ES = $('#back-color-es');
  const TOOL_COLOR_ES = $('#tool-color-es');
  const MAIN_MENU_DL = $('#main-menu-dl');
  const DOWNLOAD = $('#download');
  const ICON_CLICK_UNDO = $('#icon-click-undo');
  const ICON_CLICK_REDO = $('#icon-click-redo');
  const UNDO_ESSENTIAL = $('#undo-essential');
  const ZOOM_INPUT = $('#zoom-input');

  // Variables to create grid
  let widthCanvas = WIDTH_INPUT.val();
  let heightCanvas = HEIGHT_INPUT.val();

  let bgColor;
  let toolColor;

  // Variables TOOLS
  const BRUSH = $('#brush');
  const BRUSH_ESSENTIAL = $('#brush-essential');
  const ERASER = $('#eraser');
  const ERASER_ESSENTIAL = $('#eraser-essential');
  const FILL = $('#fill');
  const FILL_ESSENTIAL = $('#fill-essential');
  const EYEDROPPER = $('#eyedropper');
  const EYEDROPPER_ESSENTIAL = $('#eyedropper-essential');
  const RESET = $('#reset');

  let currentTool = 'brush';
  let mouseState = false;

  let saveCanvas;
  let undo;
  let redo;

  let checkRedoClick = true;
  let checkUndoClick = true;

  let currentPalette = '';

  // Convert RGB to HEX
  function rgbToHex(rgbValue) {
    rgbValue = rgbValue.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(rgbValue[1]) + hex(rgbValue[2]) + hex(rgbValue[3]);
  }

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
        CONTAINER_CANVAS.empty();
        CONTAINER_CANVAS.html(saveCanvas);
      break;
      case 'main-menu-save':
        MAIN_MENU.addClass('hidden');
        saveCanvas = CONTAINER_CANVAS.html();
        MAIN_MENU_OPEN.removeClass('disabled-text');
      break;
      case 'main-menu-dl':
      MAIN_MENU.addClass('hidden');
      DOWNLOAD.removeClass('hidden');
      $('.canvas-table td').css('width', SETTINGS_CELL_SIZE.val() + 'px');
      $('.canvas-table td').css('height', SETTINGS_CELL_SIZE.val() + 'px');
      html2canvas(CONTAINER_CANVAS.get(0)).then(canvas => {
        document.body.appendChild(canvas)
      });
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

  // Use Zoom in Tool Bar
  ZOOM_INPUT.change(function() {
    $('.canvas-table td').css('width', ZOOM_INPUT.val() + 'px');
    $('.canvas-table td').css('height', ZOOM_INPUT.val() + 'px');
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
        currentPalette = 'palette-1';
      break;
      case 'palette-2':
        COLOR_ITEM_1.css('background-color', '#955e60');
        COLOR_ITEM_2.css('background-color', '#646f62');
        COLOR_ITEM_3.css('background-color', '#b2463d');
        COLOR_ITEM_4.css('background-color', '#3d3d3d');
        COLOR_PALETTE_MENU.addClass('hidden');
        currentPalette = 'palette-2';
      break;
      case 'palette-3':
        COLOR_ITEM_1.css('background-color', '#6b7c8f');
        COLOR_ITEM_2.css('background-color', '#f7892f');
        COLOR_ITEM_3.css('background-color', '#fac231');
        COLOR_ITEM_4.css('background-color', '#dcc8aa');
        COLOR_PALETTE_MENU.addClass('hidden');
        currentPalette = 'palette-3';
      break;
      case 'palette-4':
        COLOR_ITEM_1.css('background-color', '#2c6da9');
        COLOR_ITEM_2.css('background-color', '#cf5261');
        COLOR_ITEM_3.css('background-color', '#b57d4e');
        COLOR_ITEM_4.css('background-color', '#45859b');
        COLOR_PALETTE_MENU.addClass('hidden');
        currentPalette = 'palette-4';
      break;
      case 'palette-5':
        COLOR_ITEM_1.css('background-color', '#e47122');
        COLOR_ITEM_2.css('background-color', '#09899e');
        COLOR_ITEM_3.css('background-color', '#64babf');
        COLOR_ITEM_4.css('background-color', '#f1aa7e');
        COLOR_PALETTE_MENU.addClass('hidden');
        currentPalette = 'palette-5';
      break;
    }
  });

  // Use color preset
  COLOR_ITEM_1.click(function() {
    switch (currentPalette) {
      case 'palette-1':
        TOOL_COLOR.val('#cda450');
        TOOL_COLOR_ES.val('#cda450');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-2':
        TOOL_COLOR.val('#955e60');
        TOOL_COLOR_ES.val('#955e60');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-3':
        TOOL_COLOR.val('#6b7c8f');
        TOOL_COLOR_ES.val('#6b7c8f');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-4':
        TOOL_COLOR.val('#2c6da9');
        TOOL_COLOR_ES.val('#2c6da9');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-5':
        TOOL_COLOR.val('#e47122');
        TOOL_COLOR_ES.val('#e47122');
        toolColor = TOOL_COLOR.val();
      break;
    }
  });

  COLOR_ITEM_2.click(function() {
    switch (currentPalette) {
      case 'palette-1':
        TOOL_COLOR.val('#e9e9dc');
        TOOL_COLOR_ES.val('#e9e9dc');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-2':
        TOOL_COLOR.val('#646f62');
        TOOL_COLOR_ES.val('#646f62');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-3':
        TOOL_COLOR.val('#f7892f');
        TOOL_COLOR_ES.val('#f7892f');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-4':
        TOOL_COLOR.val('#cf5261');
        TOOL_COLOR_ES.val('#cf5261');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-5':
        TOOL_COLOR.val('#09899e');
        TOOL_COLOR_ES.val('#09899e');
        toolColor = TOOL_COLOR.val();
      break;
    }
  });

  COLOR_ITEM_3.click(function() {
    switch (currentPalette) {
      case 'palette-1':
        TOOL_COLOR.val('#646c49');
        TOOL_COLOR_ES.val('#646c49');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-2':
        TOOL_COLOR.val('#b2463d');
        TOOL_COLOR_ES.val('#b2463d');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-3':
        TOOL_COLOR.val('#fac231');
        TOOL_COLOR_ES.val('#fac231');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-4':
        TOOL_COLOR.val('#b57d4e');
        TOOL_COLOR_ES.val('#b57d4e');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-5':
        TOOL_COLOR.val('#64babf');
        TOOL_COLOR_ES.val('#64babf');
        toolColor = TOOL_COLOR.val();
      break;
    }
  });

  COLOR_ITEM_4.click(function() {
    switch (currentPalette) {
      case 'palette-1':
        TOOL_COLOR.val('#393f28');
        TOOL_COLOR_ES.val('#393f28');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-2':
        TOOL_COLOR.val('#3d3d3d');
        TOOL_COLOR_ES.val('#3d3d3d');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-3':
        TOOL_COLOR.val('#dcc8aa');
        TOOL_COLOR_ES.val('#dcc8aa');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-4':
        TOOL_COLOR.val('#45859b');
        TOOL_COLOR_ES.val('#45859b');
        toolColor = TOOL_COLOR.val();
      break;
      case 'palette-5':
        TOOL_COLOR.val('#f1aa7e');
        TOOL_COLOR_ES.val('#f1aa7e');
        toolColor = TOOL_COLOR.val();
      break;
    }
  });

  // Open / Close layer button
  LAYER_BTN.click(function() {
    LAYER_POPUP.toggleClass('hidden');
  });

  // Close the download section
  DOWNLOAD.click(function() {
    DOWNLOAD.addClass('hidden');
    $('canvas').remove();
  });

  // Undo
  function undoGrid() {
    redo = CONTAINER_CANVAS.html();
    CONTAINER_CANVAS.empty();
    CONTAINER_CANVAS.html(undo);
  }

  ICON_CLICK_UNDO.click(function() {
    if (checkUndoClick) {
      undoGrid();
      checkUndoClick = false;
      checkRedoClick = true;
    }
  });

  UNDO_ESSENTIAL.click(function() {
    if (checkUndoClick) {
      undoGrid();
      checkUndoClick = false;
      checkRedoClick = true;
    }
  });

  // Redo
  ICON_CLICK_REDO.click(function() {
    if (checkRedoClick) {
      CONTAINER_CANVAS.empty();
      CONTAINER_CANVAS.html(redo);
      checkRedoClick = false;
      checkUndoClick = true;
    }
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
    LAYER_POPUP.removeClass('left-ws')
    COLOR_PALETTE_MENU.removeClass('left-ws');

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
        LAYER_POPUP.addClass('left-ws')
        COLOR_PALETTE_MENU.addClass('left-ws');
      break;
      case 'essentials':
        ITEMS_ESSENTIALS_WS.removeClass('hidden');
        MAIN_TITLE.addClass('hidden');
        ICON_CLICK_UNDO.addClass('hidden');
        ICON_CLICK_REDO.addClass('hidden');
        TOOLS_BAR.addClass('hidden');
        LAYER_POPUP.addClass('hidden');
        COLOR_PALETTE_MENU.addClass('hidden');
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

    // Show good popups
    CREATE_GRID_POPUP.addClass('hidden');
    CANVAS_TABLE.removeClass('hidden');

    // Build the grid
    makeGrid();

    // Setup the grid
    bgColor = BG_COLOR_GRID.val();
    toolColor = TOOL_COLOR_GRID.val();

    CANVAS_TABLE.css('background-color', bgColor);
    BACK_COLOR.val(bgColor);
    BACK_COLOR_ES.val(bgColor);
    TOOL_COLOR.val(toolColor);
    TOOL_COLOR_ES.val(toolColor);
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
    MAIN_MENU_SAVE.removeClass('disabled-text');
    MAIN_MENU_DL.removeClass('disabled-text');

    undo = CONTAINER_CANVAS.html();
  }

  // Remove the grid
  function removeGrid() {
    while ($('tr').length) {
      $('tr').remove();
    }
  }

  // Change colours of the colours pickers
  TOOL_COLOR.change(function() {
    toolColor = TOOL_COLOR.val();
    TOOL_COLOR_ES.val(toolColor);
  });

  BACK_COLOR.change(function() {
    bgColor = BACK_COLOR.val();
    BACK_COLOR_ES.val(bgColor);
    CANVAS_TABLE.css('background-color', bgColor);
  });

  TOOL_COLOR_ES.change(function() {
    toolColor = TOOL_COLOR_ES.val();
    TOOL_COLOR.val(toolColor);
  });

  BACK_COLOR_ES.change(function() {
    bgColor = BACK_COLOR_ES.val();
    BACK_COLOR.val(bgColor);
    CANVAS_TABLE.css('background-color', bgColor);
  });

  // Remove all the selected tools
  function removeSelectedTools() {
    BRUSH.removeClass('selected-tool');
    BRUSH_ESSENTIAL.removeClass('selected-tool');
    ERASER.removeClass('selected-tool');
    ERASER_ESSENTIAL.removeClass('selected-tool');
    FILL.removeClass('selected-tool');
    FILL_ESSENTIAL.removeClass('selected-tool');
    EYEDROPPER.removeClass('selected-tool');
    EYEDROPPER_ESSENTIAL.removeClass('selected-tool');
  }

  // Click on the tools
  BRUSH.click(function() {
    removeSelectedTools();
    BRUSH.addClass('selected-tool');
    BRUSH_ESSENTIAL.addClass('selected-tool');
    currentTool = 'brush';
  });

  BRUSH_ESSENTIAL.click(function() {
    removeSelectedTools();
    BRUSH.addClass('selected-tool');
    BRUSH_ESSENTIAL.addClass('selected-tool');
    currentTool = 'brush';
  });

  ERASER.click(function() {
    removeSelectedTools();
    ERASER.addClass('selected-tool');
    ERASER_ESSENTIAL.addClass('selected-tool');
    currentTool = 'eraser';
  });

  ERASER_ESSENTIAL.click(function() {
    removeSelectedTools();
    ERASER.addClass('selected-tool');
    ERASER_ESSENTIAL.addClass('selected-tool');
    currentTool = 'eraser';
  });

  FILL.click(function() {
    removeSelectedTools();
    FILL.addClass('selected-tool');
    FILL_ESSENTIAL.addClass('selected-tool');
    currentTool = 'fill';
  });

  FILL_ESSENTIAL.click(function() {
    removeSelectedTools();
    FILL.addClass('selected-tool');
    FILL_ESSENTIAL.addClass('selected-tool');
    currentTool = 'fill';
  });

  EYEDROPPER.click(function() {
    removeSelectedTools();
    EYEDROPPER.addClass('selected-tool');
    EYEDROPPER_ESSENTIAL.addClass('selected-tool');
    currentTool = 'eyedropper';
  });

  EYEDROPPER_ESSENTIAL.click(function() {
    removeSelectedTools();
    EYEDROPPER.addClass('selected-tool');
    EYEDROPPER_ESSENTIAL.addClass('selected-tool');
    currentTool = 'eyedropper';
  });

  // Check the state of the cursor
  CONTAINER_CANVAS.mousedown(function(event) {
    mouseState = true;
    undo = CONTAINER_CANVAS.html();

    checkUndoClick = true;
    checkRedoClick = true;
  });

  $(document).mouseup(function(event) {
    mouseState = false;
  });

  // Use tools on the grid
  $(document).on('click', '#canvas-table td', function() {
    undo = CONTAINER_CANVAS.html();

    let bgColorAttribute = $(this).attr('bgcolor');
    let tableColorAttribute = CANVAS_TABLE.css('background-color');

    switch (currentTool) {
      case 'brush':
        $(this).attr('bgcolor', toolColor);
      break;
      case 'eraser':
        $(this).removeAttr('bgcolor');
      break;
      case 'fill':
        $('td').attr('bgcolor', toolColor);
      break;
      case 'eyedropper':
        if (typeof bgColorAttribute !== typeof undefined &&
          bgColorAttribute !== false) {
            TOOL_COLOR.val(bgColorAttribute);
            TOOL_COLOR_ES.val(bgColorAttribute);
            toolColor = TOOL_COLOR.val();
        } else {
          let tableColorAttributeHex = rgbToHex(tableColorAttribute);
          TOOL_COLOR.val(tableColorAttributeHex);
          TOOL_COLOR_ES.val(tableColorAttributeHex);
          toolColor = TOOL_COLOR.val();
        }
      break;
    }

    checkUndoClick = true;
    checkRedoClick = true;
  });

  $(document).on('mouseenter', '#canvas-table td', function() {
    let selectedTool = $('.selected-tool');
    if (mouseState) {
      switch (currentTool) {
        case 'brush':
          $(this).attr('bgcolor', toolColor);
        break;
        case 'eraser':
          $(this).removeAttr('bgcolor');
        break;
      }
    }
  });

  // Reset Grid Content
  RESET.click(function() {
    $('td').attr('bgcolor', '');
  });
});
