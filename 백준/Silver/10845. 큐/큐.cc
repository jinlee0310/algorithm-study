#include <iostream>
#include <queue>
#include <string>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    queue <int> q;
    for(int i=0;i<N;i++){
        string op;
        cin >> op;
        if(op=="push"){
            int val;
            cin >> val;
            q.push(val);
        }else if(op=="pop"){
            if(q.empty()){
                cout << -1 << "\n";
            }else{
                cout << q.front() << "\n";
                q.pop();
            }
        }else if(op=="size"){
            cout << q.size() << "\n";
        }else if(op=="empty"){
            if(q.empty()){
                cout << 1 << "\n";
            }else{
                cout << 0 << "\n";
            }
        }else if(op=="front"){
            if(q.empty()){
                cout << -1 << "\n";
            }else{
                cout << q.front() << "\n";
            }
        }else{
            if(q.empty()){
                cout << -1 << "\n";
            }else{
                cout << q.back() << "\n";
            }
        }
    }
    return 0;
}