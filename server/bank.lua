local ox_inventory = exports.ox_inventory

local function provideExport(exportName, func)
	AddEventHandler(('__cfx_export_ox_vl_banking_%s'):format(exportName), function(setCB)
		setCB(func)
	end)
end

local function checkAmount(amount)
    if amount and type(amount) == 'number' and amount > 0 then
        return true
    else
        return false
    end
end

---@param source number server id to identify the player
---@param amount number
function deposit(source, amount)
    if source == nil or source == '' then return end
	if checkAmount(amount) then
		local money = ox_inventory:Search(source, 2, 'money')
        if money and type(money) == 'number' then
            if money >= amount then
                ox_inventory:RemoveItem(source, 'money', amount)
                exports.ox_accounts:add(source, 'bank', amount)
            end
        end
	else
        print(GetPlayerName(source) .. ' is sketchy')
    end
end
provideExport('deposit', deposit)

---@param source number server id to identify the player
---@param amount number
function withdraw(source, amount)
    if source == nil or source == '' then return end
	if checkAmount(amount) then
		local bank = exports.ox_accounts:get(source, 'bank')
        if bank and type(bank) == 'number' then
            if bank >= amount then
                ox_inventory:AddItem(source, 'money', amount)
                exports.ox_accounts:remove(source, 'bank', amount)
            end
        end
	else
        print(GetPlayerName(source) .. ' is sketchy')
    end
end
provideExport('withdraw', withdraw)

---@param source number server id to identify the player
---@param to number server id to identify the player
---@param amount number
function transfer(source, to, amount)
    if source == nil or source == '' or to == nil or to == '' then return end
    local name = GetPlayerName(to)
    if name then
        if checkAmount(amount) then
            local bank = exports.ox_accounts:get(source, 'bank')
            if bank and type(bank) == 'number' then
                if bank >= amount then
                    exports.ox_accounts:remove(source, 'bank', amount)
                    exports.ox_accounts:add(to, 'bank', amount)
                end
            end
        else
            print(GetPlayerName(source) .. ' is sketchy')
        end
    else
        print("Player is not online")
    end
end
provideExport('transfer', transfer)
