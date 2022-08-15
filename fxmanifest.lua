--[[ FX Information ]]--
fx_version   'cerulean'
use_fxv2_oal 'yes'
lua54        'yes'
game         'gta5'

--[[ Resource Information ]]--
name         'vl_banking'
author       'Volumed'
version      '0.0.1'
repository   ''
description  'Banking UI'

--[[ Manifest ]]--
shared_script '@ox_lib/init.lua'
shared_script 'init.lua'

server_scripts {
    '@ox_core/imports/server.lua',
    'server/bank.lua',
    'server/main.lua'
}

client_scripts {
    'client/bank.lua',
    'client/main.lua'
}

ui_page 'web/build/index.html'

files {
	 'config.json',
    'web/build/index.html',
    'web/build/**/*'
}
