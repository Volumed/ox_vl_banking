--[[ FX Information ]]--
fx_version   'cerulean'
use_fxv2_oal 'yes'
lua54        'yes'
game         'gta5'

--[[ Resource Information ]]--
name         'ox_vl_banking'
author       'Volumed'
version      '0.0.1'
repository   ''
description  'Banking UI'

--[[ Manifest ]]--
shared_script '@ox_lib/init.lua'

server_scripts {
	'@oxmysql/lib/MySQL.lua',
    'server/bank.lua',
    'server/main.lua'
}

client_scripts {
    'client/bank.lua',
    'client/main.lua'
}

ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/**/*'
}
