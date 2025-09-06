#include <iostream>

using namespace std;

int main()
{
    int N;
    cin >> N;

    int arr[6];
    for(int i=0;i<6;i++){
        cin >> arr[i];
    }

    int T,P;
    cin >> T >> P;

    int sum=0;
    for(int i=0;i<6;i++){
        int remain=arr[i]%T;

        if(remain==0){
            sum+=arr[i]/T;
        }else{
            sum+=(arr[i]/T+1);
        }
    }

    cout << sum << "\n";
    cout << N/P << " " << N%P;
    return 0;
}