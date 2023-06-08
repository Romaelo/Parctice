const player=1, dealer=1, none = 0;   //플레이어, 딜러
let player_card;   //플레이어 카드값
let dealer_card;   //딜러 카드값
let winner;   //승자
let win, lose, draw = 0;    //승점
let deal, hit, stand = 0;   //플레이어의 선택 => 선택 활성화 됐을 경우 1로 값 변경하여 조건 만족
let card = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']    //카드 배열
let standing = false;   //stand 버튼 눌렀을 떄 활성화
let turnEnd = false;    //딜러 턴이 끝났을 때 활성화

// standing == true && turnEnd == true 일 경우 승자 판별로 넘어가는 조건 만족

//Hit 버튼을 눌렀을 경우에 발생하는 이벤트 => 플레이어에게 카드 배분
document.querySelector('#hit_btn').addEventListener('click', Hit); 

//Stand 버튼을 눌렀을 경우에 발생하는 이벤트 => 딜러 파트로 넘어감
document.querySelector('#stand_btn').addEventListener('click', Stand);

//Deal 버튼을 눌렀을 경우에 발생하는 이벤트 => 초기화 후 게임 시작
document.querySelector('#deal_btn').addEventListener('click', Again);


function Hit()

function Stand() {
    if (player_card <= 21 && !standing) {
      standing = true;
      DealerTurn();
    }
  }

function Again() {
    player_card = 0;
    dealer_card = 0;
    winner = none;
    standing = false;
    turnEnd = false;
  }

  function DealerTurn() {
    while (dealer_card < 17) {
      let randomCardIndex = Math.floor(Math.random() * card.length);
      let drawnCard = card[randomCardIndex];
      dealer_card += getCardValue(drawnCard);
      // 딜러에게 카드를 배분하는 로직을 추가했습니다.
      // dealer_card 값을 업데이트합니다.
  
      if (dealer_card > 21) {
        winner = player;
        lose++;
        return;
      }
    }
    turnEnd = true;
    Winner();
  }
  
//승자 판별
function Winner() {

    if(player_card > 21 && dealer_card > 21) {  //둘 다 버스트
        winner = none;
        draw++;
    } else if (player_card > 21 && dealer_card < 22) {  //플레이어만 버스트 -> 패
        winner = dealer;
        lose++;
    } else if (player_card <22) {   //플레이어 버스트 X 한 상태
        if(dealer_card>21){         //딜러 버스트 -> 승
            winner = player
            win++;
        } else if(dealer_card<22){  //딜러 버스트 X 한 상태
            if(player_card<dealer_card){    //딜러 카드값이 근접 -> 패
                winner = dealer;
                lose++;
            } else if (player_card>dealer_card){    //플레이어 카드값이 근접 -> 승
                winner = player;
                win++;
            } else{                         //동점 -> 무승부
                winner = none;
                draw++;
            }
        }
    }
}   //function Winner;
