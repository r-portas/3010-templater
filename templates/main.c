/**
  ******************************************************************************
  * @file    {{stage}}/main.c
  * @author  {{name}}
  * @date    {{date}}
  * @brief   {{description}}
  ******************************************************************************
  */

/* Includes ------------------------------------------------------------------*/
#include "board.h"
#include "stm32f4xx_hal_conf.h"
#include "debug_printf.h"

/* Private typedef -----------------------------------------------------------*/
/* Private define ------------------------------------------------------------*/
/* Private macro -------------------------------------------------------------*/
/* Private variables ---------------------------------------------------------*/

/* Private function prototypes -----------------------------------------------*/
void Hardware_init(void);
void exti_a2_interrupt_handler(void);

/**
  * @brief
  * @param  None
  * @retval None
  */
void main(void) {

	BRD_init();	//Initalise NP2
	Hardware_init();	//Initalise hardware modules

	/* Main processing loop */
  	while (1) {


		  BRD_LEDToggle();
      HAL_Delay(1000);		//Delay for 1s (1000ms)

	}
}

/**
  * @brief  Initialise Hardware
  * @param  None
  * @retval None
  */
void Hardware_init(void) {

	GPIO_InitTypeDef  GPIO_InitStructure;

	BRD_LEDInit();		//Initialise Blue LED
	BRD_LEDOn();		//Turn off Blue LED


}
