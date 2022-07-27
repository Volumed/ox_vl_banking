RegisterNetEvent('vl_banking:deposit', function(data)
    exports.vl_banking:deposit(source, tonumber(data.amount))
end)

RegisterNetEvent('vl_banking:withdraw', function(data)
    exports.vl_banking:withdraw(source, tonumber(data.amount))
end)

RegisterNetEvent('vl_banking:transfer', function(data)
    exports.vl_banking:transfer(source, tonumber(data.to), tonumber(data.amount))
end)

local ox_inventory = exports.ox_inventory

lib.callback.register('vl_banking:getData', function(source)
    local money = ox_inventory:Search(source, 2, 'money') or 0
    local player = Ox.GetPlayer(source)
    local accounts = Ox.GetAccounts(player.charid)
    local balance = accounts.get('fleeca')
    local players = GetPlayers()

    return {
        money = money,
        balance = balance,
        players = players
    }
end)
