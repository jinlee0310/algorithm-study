#include <iostream>
#include <queue>

using namespace std;

int main()
{

    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int R,C;
    int graph[501][501]={0,};
    int visited[501][501]={0,};

    cin >> R >> C;

    for(int r=0;r<R;r++){
        for(int c=0;c<C;c++){
            cin >> graph[r][c];
        }
    }

    int dr[4]={0, 0, 1, -1};
    int dc[4]={1,-1,0,0};

    int answer=0;
    int cnt=0;
    for(int r=0;r<R;r++){
        for(int c=0;c<C;c++){
            if(!visited[r][c] && graph[r][c]){
                // bfs
                cnt++;
                queue <pair<int,int>> q;
                visited[r][c]=1;
                q.push({r,c});
                int size=0;
                while(q.size()){
                    pair <int,int> cur=q.front();
                    q.pop();
                    size++;

                    for(int i=0;i<4;i++){
                        int nr=cur.first+dr[i];
                        int nc=cur.second+dc[i];

                        if(0<=nr && nr<R && 0<=nc && nc<C && !visited[nr][nc]&&graph[nr][nc]){
                            visited[nr][nc]=1;
                            q.push({nr,nc});
                        }
                    }
                }

                if(size>answer){
                    answer=size;
                }
            }
        }
    }

    cout << cnt << "\n" << answer << "\n";

    return 0;
    
}