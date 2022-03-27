local ATMProps = {
	`prop_atm_01`,
	`prop_atm_02`,
	`prop_atm_03`,
	`prop_fleeca_atm`,
	`v_5_b_atm1`,
	`v_5_b_atm2`
}

local OpenBank = function()
	lib.callback('ox_vl_banking:getData', 1000, function(data)
		SetNuiFocus(true, true)
		SendNUIMessage({
			type = 'open',
			money = data.money,
			balance = data.balance,
			players = json.encode(data.players),
		})
	end)
end

exports.qtarget:AddTargetModel(ATMProps, {
	options = {{
		icon = 'fas fa-credit-card',
		label = 'Use ATM',
		action = OpenBank
	}},
	distance = 1.5
})
