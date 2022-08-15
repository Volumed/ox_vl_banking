local ATMProps = {
	`prop_atm_01`,
	`prop_atm_02`,
	`prop_atm_03`,
	`prop_fleeca_atm`,
	`v_5_b_atm1`,
	`v_5_b_atm2`
}

RegisterNetEvent("openBank", function()
	lib.callback('vl_banking:getData', 1000, function(data)
		SetNuiFocus(true, true)
		SendNUIMessage({
			type = 'open',
			money = data.money,
			balance = data.balance,
			players = json.encode(data.players),
		})
	end)
end)

if config.target.ox_target then
	exports.ox_target:addGlobalObject({
		{
			icon = 'fas fa-credit-card',
			label = 'Open ATM',
			event = 'openBank',
			canInteract = function(entity, coords, distance)
				return true
			end
		}
	})
elseif config.target.qtarget then
	exports.qtarget:AddTargetModel(ATMProps, {
		options = {{
			icon = 'fas fa-credit-card',
			label = 'Use ATM',
			event = 'openBank'
		}},
		distance = 1.5
	})
end